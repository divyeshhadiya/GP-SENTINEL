# SENTINEL Edge Agent & Ingestion Client

This Python client script directly consumes the Gujarat Police SENTINEL Camera Grid, conforming precisely to the official **Consuming the Sentinel Camera Grid — Integrator's Guide**:

### Checklist Compliance:
- [x] **Forced RTSP over TCP** (`os.environ["OPENCV_FFMPEG_CAPTURE_OPTIONS"] = "rtsp_transport;tcp"`)
- [x] **Monotonic PTS Timing** (`cap.get(cv2.CAP_PROP_POS_MSEC)`) instead of wall-clock or `CAP_PROP_FPS`
- [x] **Inter-frame gap tolerance** & scene cut loop point re-initialization
- [x] **Exponential Reconnection Backoff** (2.0s initial -> 30s ceiling)
- [x] **Catalogue Contract Consumption** (`GET /api/ingest`)
- [x] **Mixed H.264 & H.265 stream decoding capability**

### Usage:
```bash
cd edge-agent
pip install -r requirements.txt

# Run for a specific camera discovered from catalogue
python sentinel_ingest_client.py --host https://your-deployment.vercel.app --camera CAM-GNR-001 --preview
```
