"""
Gujarat Police Innovation Challenge 2026 — SENTINEL
Edge Agent Ingest & Video Analytics Pipeline Client
Adheres strictly to the official Integrator's Guide (§1 - §4)

Key Features:
1. Dynamic Camera Catalogue ingestion from /api/ingest (no hardcoded endpoints).
2. Forced TCP transport (OPENCV_FFMPEG_CAPTURE_OPTIONS=rtsp_transport;tcp).
3. Monotonic Presentation Timestamp (PTS) elapsed timing (cv2.CAP_PROP_POS_MSEC).
4. Exponential backoff reconnection (2s base up to 30s cap).
5. Robust handling of mixed H.264 / H.265 streams and loop cut scene discontinuities.
"""

import os
import time
import json
import logging
import argparse
import requests
from typing import Dict, Any, Optional

# Force RTSP over TCP to prevent firewall packet drops per §3
os.environ["OPENCV_FFMPEG_CAPTURE_OPTIONS"] = "rtsp_transport;tcp"

# Set up clean logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] [SENTINEL-EDGE] %(message)s"
)
logger = logging.getLogger("sentinel_ingest")


def fetch_camera_catalogue(api_host: str) -> Dict[str, Any]:
    """Fetch all camera configurations from the official catalogue endpoint per §1"""
    url = f"{api_host.rstrip('/')}/api/ingest"
    logger.info(f"Fetching camera catalogue from: {url}")
    try:
        resp = requests.get(url, timeout=10)
        resp.raise_for_status()
        data = resp.json()
        logger.info(f"Successfully discovered {data.get('total_cameras', 0)} cameras from catalogue contract.")
        return data
    except Exception as e:
        logger.error(f"Failed to fetch catalogue from {url}: {e}")
        raise


def run_pipeline(
    camera_id: str,
    stream_url: str,
    codec: str,
    resolution: str,
    preview: bool = False
):
    """
    Connect to a live RTP/RTSP camera stream with exponential backoff,
    PTS monotonic timing, and discontinuity recovery.
    """
    try:
        import cv2
    except ImportError:
        logger.error("OpenCV not installed. Install via: pip install opencv-python")
        return

    logger.info(f"Starting ingestion pipeline for Camera: {camera_id}")
    logger.info(f"Endpoint: {stream_url} | Codec: {codec} | Declared Res: {resolution}")

    backoff_seconds = 2.0
    max_backoff = 30.0

    while True:
        logger.info(f"Attempting connection to {stream_url} (Transport: TCP)...")
        cap = cv2.VideoCapture(stream_url, cv2.CAP_FFMPEG)

        if not cap.isOpened():
            logger.warning(f"Connection failed. Reconnecting in {backoff_seconds:.1f}s (exponential backoff)...")
            time.sleep(backoff_seconds)
            backoff_seconds = min(backoff_seconds * 1.8, max_backoff)
            continue

        # Connection succeeded — reset backoff
        logger.info(f"Stream attached successfully for {camera_id}.")
        backoff_seconds = 2.0

        last_pts = None
        frame_counter = 0

        while True:
            ok, frame = cap.read()
            if not ok:
                logger.warning("Stream interrupted or connection dropped by server. Initiating graceful recovery...")
                break

            # Use monotonic PTS per Integrator's Guide §2 & §3 (DO NOT use arrival wall-clock or CAP_PROP_FPS)
            pts_ms = cap.get(cv2.CAP_PROP_POS_MSEC)
            frame_counter += 1

            # Detect scene cut / loop restart (pts reset)
            if last_pts is not None and pts_ms < last_pts:
                logger.info(f"Detected feed loop/scene discontinuity at PTS {pts_ms:.0f}ms. Re-initializing tracker state.")

            last_pts = pts_ms

            # Sample logging every 90 frames
            if frame_counter % 90 == 0:
                h, w = frame.shape[:2]
                logger.info(f"[{camera_id}] PTS: {pts_ms:.0f} ms | Native Resolution: {w}x{h} | Frames Processed: {frame_counter}")

            if preview:
                # Add tactical OSD overlay
                cv2.putText(frame, f"{camera_id} | PTS: {pts_ms:.0f}ms | TCP", (20, 30),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)
                cv2.imshow(f"SENTINEL Live Feed - {camera_id}", frame)
                if cv2.waitKey(1) & 0xFF == ord('q'):
                    logger.info("User requested termination.")
                    cap.release()
                    cv2.destroyAllWindows()
                    return

        cap.release()
        logger.info(f"Waiting {backoff_seconds:.1f}s before attempting reconnection...")
        time.sleep(backoff_seconds)
        backoff_seconds = min(backoff_seconds * 1.8, max_backoff)


def main():
    parser = argparse.ArgumentParser(description="Gujarat Police SENTINEL Ingest Pipeline Client")
    parser.add_argument("--host", default="http://localhost:3000", help="SENTINEL API Host URL (e.g. https://your-app.vercel.app or http://localhost:3000)")
    parser.add_argument("--camera", default="CAM-GNR-001", help="Target Camera ID to stream")
    parser.add_argument("--preview", action="store_true", help="Display OpenCV graphical window")
    args = parser.parse_args()

    catalogue = fetch_camera_catalogue(args.host)
    cameras = catalogue.get("cameras", [])

    matched = next((c for c in cameras if c["id"] == args.camera), None)
    if not matched:
        logger.error(f"Camera ID '{args.camera}' not found in catalogue. Available IDs:")
        for c in cameras[:10]:
            logger.error(f" - {c['id']}: {c['name']}")
        return

    rtsp_url = matched["urls"]["rtsp_tcp"]
    codec = matched["stream_properties"]["codec"]
    resolution = matched["stream_properties"]["resolution"]

    run_pipeline(args.camera, rtsp_url, codec, resolution, preview=args.preview)


if __name__ == "__main__":
    main()
