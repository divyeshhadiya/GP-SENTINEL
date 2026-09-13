# -*- coding: utf-8 -*-
import os
import sys
import json
import shutil
import numpy as np
from PIL import Image, ImageDraw, ImageFont
import imageio

print("[*] GP-SENTINEL 1080p Video Walkthrough Generator Starting...")

download_dir = "C:/Download"
os.makedirs(download_dir, exist_ok=True)
public_assets = "c:/SentinelProject/public/assets"
os.makedirs(public_assets, exist_ok=True)

out_primary = os.path.join(download_dir, "GP-SENTINEL_Complete_Project_Walkthrough_Video.mp4")
out_copies = [
    os.path.join(download_dir, "GP-SENTINEL_Walkthrough_Video.mp4"),
    os.path.join(public_assets, "GP-SENTINEL_Complete_Project_Walkthrough_Video.mp4"),
    os.path.join("c:/SentinelProject/public", "GP-SENTINEL_Complete_Project_Walkthrough_Video.mp4")
]

with open("c:/SentinelProject/scripts/scenes.json", "r", encoding="utf-8") as f:
    SCENES = json.load(f)

WIDTH = 1920
HEIGHT = 1080
FPS = 30
FRAMES_PER_SCENE = 75
TOTAL_SCENES = len(SCENES)
TOTAL_FRAMES = FRAMES_PER_SCENE * TOTAL_SCENES

def get_font(name, size, bold=False):
    try:
        if "consolas" in name.lower():
            return ImageFont.truetype("C:/Windows/Fonts/consola.ttf", size)
        if bold:
            return ImageFont.truetype("C:/Windows/Fonts/arialbd.ttf", size)
        return ImageFont.truetype("C:/Windows/Fonts/arial.ttf", size)
    except Exception:
        return ImageFont.load_default()

f_h1 = get_font("arial", 26, bold=True)
f_h2 = get_font("arial", 20, bold=True)
f_h3 = get_font("arial", 17, bold=True)
f_body = get_font("arial", 15)
f_body_bold = get_font("arial", 15, bold=True)
f_sub = get_font("arial", 13)
f_mono = get_font("consolas", 14)
f_mono_sm = get_font("consolas", 12)

C_BG = (4, 13, 26)
C_NAVY_DARK = (0, 24, 48)
C_NAVY = (0, 35, 71)
C_CARD_BG = (10, 25, 47)
C_CARD_INNER = (14, 34, 61)
C_BORDER = (24, 49, 83)
C_GOLD = (217, 119, 6)
C_GOLD_BRIGHT = (245, 158, 11)
C_SKY = (56, 189, 248)
C_WHITE = (255, 255, 255)
C_MUTED = (148, 163, 184)
C_GREEN = (16, 185, 129)
C_RED = (239, 68, 68)

police_logo = None
logo_p = "c:/SentinelProject/public/assets/gujarat-police-logo.png"
if os.path.exists(logo_p):
    try:
        img = Image.open(logo_p).convert("RGBA")
        police_logo = img.resize((70, 70), Image.Resampling.LANCZOS)
    except Exception as e:
        print("Logo load err:", e)

def draw_card(draw, x, y, w, h, bg=C_CARD_BG, border=C_BORDER, radius=8):
    draw.rounded_rectangle([x, y, x + w, y + h], radius=radius, fill=bg, outline=border, width=2)

def render_frame(scene_idx, frame_in_scene):
    scene = SCENES[scene_idx]
    global_frame = scene_idx * FRAMES_PER_SCENE + frame_in_scene
    global_progress = global_frame / TOTAL_FRAMES

    img = Image.new("RGB", (WIDTH, HEIGHT), C_BG)
    draw = ImageDraw.Draw(img)

    for gx in range(0, WIDTH, 80):
        draw.line([(gx, 0), (gx, HEIGHT)], fill=(8, 20, 38), width=1)
    for gy in range(0, HEIGHT, 80):
        draw.line([(0, gy), (WIDTH, gy)], fill=(8, 20, 38), width=1)

    draw.rectangle([0, 0, WIDTH, 95], fill=C_NAVY_DARK)
    draw.line([(0, 95), (WIDTH, 95)], fill=C_GOLD, width=3)

    if police_logo:
        img.paste(police_logo, (35, 12), police_logo)

    draw.text((120, 16), "GUJARAT POLICE • STATE CRIME RECORD BUREAU (SCRB)", font=f_h3, fill=C_GOLD_BRIGHT)
    draw.text((120, 44), "GP-SENTINEL STATEWIDE VIDEO INTELLIGENCE PLATFORM", font=f_h1, fill=C_WHITE)

    draw_card(draw, WIDTH - 430, 18, 395, 58, bg=C_NAVY, border=C_SKY, radius=6)
    draw.text((WIDTH - 415, 26), "CLASSIFIED • EVALUATION DEMO", font=f_mono_sm, fill=C_GOLD_BRIGHT)
    draw.text((WIDTH - 415, 48), "MODEL 5 HYBRID ARCHITECTURE", font=f_mono_sm, fill=C_WHITE)

    draw.rectangle([0, 98, WIDTH, 155], fill=C_NAVY)
    draw.line([(0, 155), (WIDTH, 155)], fill=C_BORDER, width=2)

    draw.text((35, 108), scene["title"].upper(), font=f_h2, fill=C_WHITE)
    draw.text((35, 133), scene["sub"], font=f_sub, fill=C_MUTED)

    b_col = tuple(scene["badge_col"])
    draw_card(draw, WIDTH - 350, 106, 315, 38, bg=C_CARD_BG, border=b_col, radius=6)
    draw.ellipse([WIDTH - 335, 120, WIDTH - 323, 132], fill=b_col)
    draw.text((WIDTH - 315, 116), scene["badge"], font=f_mono_sm, fill=C_WHITE)

    left_x, left_y, left_w, left_h = 35, 175, 1120, 715
    draw_card(draw, left_x, left_y, left_w, left_h, bg=C_CARD_BG, border=C_BORDER)

    right_x, right_y, right_w, right_h = 1180, 175, 705, 715
    draw_card(draw, right_x, right_y, right_w, right_h, bg=C_CARD_BG, border=C_BORDER)

    draw.rectangle([right_x + 15, right_y + 15, right_x + right_w - 15, right_y + 58], fill=C_CARD_INNER)
    draw.text((right_x + 30, right_y + 24), "SYSTEM TELEMETRY & SPECIFICATIONS", font=f_h3, fill=C_SKY)

    y_pos = right_y + 75
    for label, val in scene["specs"]:
        draw_card(draw, right_x + 20, y_pos, right_w - 40, 90, bg=C_CARD_INNER, border=C_BORDER, radius=6)
        draw.text((right_x + 35, y_pos + 10), label.upper(), font=f_mono_sm, fill=C_GOLD_BRIGHT)
        v1 = val[:46] + "..." if len(val) > 48 else val
        draw.text((right_x + 35, y_pos + 38), v1, font=f_body_bold, fill=C_WHITE)
        y_pos += 100

    draw.rectangle([left_x + 25, left_y + 25, left_x + left_w - 25, left_y + 75], fill=C_NAVY)
    draw.text((left_x + 45, left_y + 36), scene["spec_title"].upper(), font=f_h3, fill=C_GOLD_BRIGHT)

    dtype = scene["draw_type"]
    if dtype == "overview":
        nodes = [
            ("VISWAS Police Netram", "8,200 Cameras • Traffic & Public Safety", C_SKY),
            ("Smart Cities (G-SWAN)", "14,500 Cameras • Gandhinagar, GIFT City, Ahmedabad", C_GREEN),
            ("Roads & Buildings (Tolls)", "4,800 Cameras • National Highways & Expressways", C_GOLD),
            ("GSRTC Transport Ports", "3,200 Cameras • Inter-City Bus Terminals", C_SKY),
            ("Education & Universities", "28,000 Cameras • Exam Halls & Campuses", C_MUTED),
            ("Mines, Ports & Forests", "21,300 Cameras • Coastal Border Security", C_RED)
        ]
        for i, (dept_name, dept_desc, col) in enumerate(nodes):
            row, col_idx = i // 2, i % 2
            bx, by = left_x + 35 + col_idx * 535, left_y + 100 + row * 185
            draw_card(draw, bx, by, 510, 160, bg=C_CARD_INNER, border=col, radius=8)
            draw.rectangle([bx + 15, by + 15, bx + 22, by + 45], fill=col)
            draw.text((bx + 35, by + 20), dept_name, font=f_h3, fill=C_WHITE)
            draw.text((bx + 35, by + 58), dept_desc, font=f_body, fill=C_MUTED)
            draw.text((bx + 35, by + 105), "● LIVE RTSP TELEMETRY CONNECTED", font=f_mono_sm, fill=col)

    elif dtype == "login":
        accs = [
            ("DGP • Dr. Vikas Sahay, IPS", "dgp.police@gujarat.gov.in", "Badge: GP-DGP-01 • SCRB Gandhinagar", C_GOLD),
            ("SP Command • Shri Ajay Choudhary, IPS", "sp.command@gujarat.gov.in", "Badge: GP-SP-04 • Ahmedabad City HQ", C_SKY),
            ("Traffic PI • Inspector R.K. Vaghela", "traffic.surat@gujarat.gov.in", "Badge: GP-TI-12 • Surat Netram Cell", C_GREEN)
        ]
        ly = left_y + 105
        for title, email, badge_info, col in accs:
            draw_card(draw, left_x + 40, ly, left_w - 80, 155, bg=C_CARD_INNER, border=col, radius=8)
            draw.text((left_x + 65, ly + 20), title, font=f_h2, fill=C_WHITE)
            draw.text((left_x + 65, ly + 65), "Login Email: " + email + "  |  Password: [ GujaratPolice@2026 ] (Autofill)", font=f_mono, fill=C_GOLD_BRIGHT)
            draw.text((left_x + 65, ly + 108), badge_info + "  •  1-Click Quick Autofill Role Ready", font=f_body, fill=C_MUTED)
            ly += 180

    elif dtype == "architecture":
        draw_card(draw, left_x + 40, left_y + 105, left_w - 80, 245, bg=C_CARD_INNER, border=C_RED, radius=8)
        draw.text((left_x + 65, left_y + 125), "TRADITIONAL PURE CENTRALIZED VMS (INEFFICIENT & REJECTED)", font=f_h3, fill=C_RED)
        draw.text((left_x + 65, left_y + 168), "Streaming 80,000 raw video feeds over Gujarat State WAN (G-SWAN):", font=f_body, fill=C_WHITE)
        draw.text((left_x + 65, left_y + 208), "80,000 feeds x 2.0 Mbps = 160.0 Gbps Continual WAN Saturation (CRASH)", font=f_mono, fill=C_RED)
        draw.text((left_x + 65, left_y + 260), "Requires unfeasible bandwidth budget and causes massive packet drops during emergencies.", font=f_sub, fill=C_MUTED)

        draw_card(draw, left_x + 40, left_y + 380, left_w - 80, 285, bg=C_CARD_INNER, border=C_GREEN, radius=8)
        draw.text((left_x + 65, left_y + 400), "GP-SENTINEL MODEL 5 HYBRID DISTRIBUTED EDGE INGESTION (ADOPTED)", font=f_h3, fill=C_GREEN)
        draw.text((left_x + 65, left_y + 445), "1. Edge Analytics: District NVRs & Edge boxes extract ANPR plate OCR & telemetry locally.", font=f_body, fill=C_WHITE)
        draw.text((left_x + 65, left_y + 485), "2. JSON Event Telemetry: Only 2 KB structured JSON metadata sent to SCRB Core Gandhinagar.", font=f_body, fill=C_WHITE)
        draw.text((left_x + 65, left_y + 530), "3. Result: 4.8 Gbps Peak Load = 97% Bandwidth Savings Across Gujarat State WAN!", font=f_mono, fill=C_GOLD_BRIGHT)
        draw.text((left_x + 65, left_y + 585), "4. Full-resolution video pulled strictly on-demand when positive Watchlist match occurs.", font=f_sub, fill=C_MUTED)

    elif dtype == "registry":
        cams = [
            ("CAM-GNR-001", "SCRB Police Bhawan Main Gate", "Gandhinagar", "4K UHD", "14ms"),
            ("CAM-GNR-004", "GIFT City Central Boulevard Gate 1", "Gandhinagar", "4K UHD", "9ms"),
            ("CAM-AMD-001", "SG Highway Iscon Cross Road ANPR East", "Ahmedabad", "4K UHD", "11ms"),
            ("CAM-AMD-002", "Sanand GIDC Highway Toll Plaza Gate 2", "Ahmedabad", "1080p", "16ms"),
            ("CAM-VAD-001", "Vadodara NE-1 Expressway Toll Inbound", "Vadodara", "4K UHD", "14ms"),
            ("CAM-BHR-001", "Narmada Cable Bridge NH-48 Southbound", "Bharuch", "1080p", "17ms"),
            ("CAM-SRT-001", "Surat Ring Road Sahara Darwaja Flyover", "Surat", "4K UHD", "12ms")
        ]
        cy = left_y + 105
        for cid, cname, dist, res, ping in cams:
            draw_card(draw, left_x + 35, cy, left_w - 70, 72, bg=C_CARD_INNER, border=C_BORDER, radius=6)
            draw.text((left_x + 55, cy + 15), cid, font=f_mono, fill=C_SKY)
            draw.text((left_x + 220, cy + 15), cname[:35], font=f_body_bold, fill=C_WHITE)
            draw.text((left_x + 640, cy + 15), dist, font=f_body, fill=C_GOLD_BRIGHT)
            draw.text((left_x + 780, cy + 15), res + " | " + ping, font=f_mono_sm, fill=C_MUTED)
            draw.rectangle([left_x + 980, cy + 12, left_x + 1060, cy + 42], fill=(6, 78, 59))
            draw.text((left_x + 995, cy + 18), "ONLINE", font=f_mono_sm, fill=C_GREEN)
            cy += 82

    elif dtype == "videowall":
        for r in range(3):
            for c in range(3):
                bx = left_x + 35 + c * 355
                by = left_y + 100 + r * 185
                draw_card(draw, bx, by, 340, 170, bg=(6, 18, 36), border=C_BORDER, radius=6)
                draw.rectangle([bx + 10, by + 10, bx + 330, by + 130], fill=(2, 10, 20))
                draw.text((bx + 20, by + 18), f"CAM-CH-{r*3 + c + 1}", font=f_mono_sm, fill=C_SKY)
                draw.text((bx + 20, by + 45), "320x180 @ 15 FPS", font=f_mono_sm, fill=C_MUTED)
                draw.text((bx + 20, by + 75), "SUB-STREAM: 350 Kbps", font=f_mono_sm, fill=C_GREEN)
                if r == 1 and c == 1:
                    draw.rectangle([bx + 8, by + 8, bx + 332, by + 132], outline=C_GOLD_BRIGHT, width=2)
                    draw.text((bx + 150, by + 18), "TARGET ZOOM", font=f_mono_sm, fill=C_GOLD_BRIGHT)
                draw.text((bx + 15, by + 142), "Bandwidth Throttle: Active (-94%)", font=f_sub, fill=C_SKY)

    elif dtype == "federation":
        vms_list = [
            ("Hikvision VMS", "iVMS-4200 SDK & ISAPI Adapter", "RTSP / H.265 / Digest Auth", C_SKY),
            ("Dahua Technology", "DSS Pro & WizMind ANPR Interface", "DH-RTSP / ONVIF Profile S", C_GREEN),
            ("Matrix SATATYA", "G-SWAN NetOps Smart Streaming Bridge", "REST JSON / WebRTC Stream", C_GOLD),
            ("Hanwha Wisenet", "Wave Video Management Gateway", "Profile T / RTSP / AAC", C_SKY),
            ("CP PLUS UniMax", "R&B Highway Toll Plaza NVR Proxy", "H.264 / ONVIF Profile G", C_MUTED),
            ("Milestone Systems", "XProtect Corporate Federation Server", "ONVIF Profile S/T Bridge", C_WHITE)
        ]
        fy = left_y + 105
        for vname, vadapt, vproto, vcol in vms_list:
            draw_card(draw, left_x + 35, fy, left_w - 70, 85, bg=C_CARD_INNER, border=vcol, radius=6)
            draw.text((left_x + 60, fy + 15), vname, font=f_h2, fill=C_WHITE)
            draw.text((left_x + 380, fy + 18), vadapt, font=f_body, fill=C_GOLD_BRIGHT)
            draw.text((left_x + 60, fy + 52), "Protocol Normalized: " + vproto, font=f_mono_sm, fill=C_MUTED)
            draw.rectangle([left_x + 880, fy + 22, left_x + 1040, fy + 55], fill=(8, 47, 73))
            draw.text((left_x + 895, fy + 28), "PROXY ACTIVE", font=f_mono_sm, fill=C_SKY)
            fy += 96

    elif dtype == "vehicle":
        hops = [
            ("HOP 1", "08:14 AM", "Ahmedabad • SG Highway Iscon Cross Road", "64 km/h", "99.1% conf"),
            ("HOP 2", "08:42 AM", "Ahmedabad • Sanand GIDC Highway Toll Plaza", "78 km/h", "99.4% conf"),
            ("HOP 3", "09:32 AM", "Vadodara • NE-1 Expressway Toll Inbound", "88 km/h", "98.9% conf"),
            ("HOP 4", "10:48 AM", "Bharuch • Narmada Golden Cable Bridge NH-48", "72 km/h", "99.2% conf"),
            ("HOP 5", "11:45 AM", "Surat • Ring Road Sahara Darwaja Flyover", "56 km/h", "99.3% conf")
        ]
        hy = left_y + 105
        for hnum, htime, hloc, hspeed, hconf in hops:
            draw_card(draw, left_x + 35, hy, left_w - 70, 95, bg=C_CARD_INNER, border=C_GOLD if "HOP 5" in hnum else C_BORDER, radius=6)
            draw.rectangle([left_x + 45, hy + 15, left_x + 130, hy + 50], fill=C_GOLD if "HOP 5" in hnum else C_NAVY)
            draw.text((left_x + 55, hy + 22), hnum, font=f_mono, fill=C_WHITE)
            draw.text((left_x + 150, hy + 22), hloc, font=f_body_bold, fill=C_WHITE)
            draw.text((left_x + 150, hy + 58), f"Timestamp: {htime}  |  Speed: {hspeed}  |  ANPR Confidence: {hconf}", font=f_mono_sm, fill=C_GOLD_BRIGHT)
            draw.text((left_x + 780, hy + 22), "SHA-256 HASH VERIFIED", font=f_mono_sm, fill=C_GREEN)
            hy += 112

    elif dtype == "alert":
        draw_card(draw, left_x + 35, left_y + 105, left_w - 70, 260, bg=C_CARD_INNER, border=C_RED, radius=8)
        draw.text((left_x + 60, left_y + 130), "WATCHLIST MATCH: GJ-01-AB-1234 (White Mahindra Scorpio)", font=f_h2, fill=C_WHITE)
        draw.text((left_x + 60, left_y + 175), "Database Source: VAHAN Stolen Registry  |  Category: Stolen Vehicle Heist", font=f_body, fill=C_GOLD_BRIGHT)
        draw.text((left_x + 60, left_y + 215), "Case FIR: FIR-1120/2026/NAV  |  Police Station: Navrangpura PS, Ahmedabad", font=f_body, fill=C_WHITE)
        draw.text((left_x + 60, left_y + 255), "Registered Owner: Manoj B. Patel  |  Status: ACTIVE LOOK-OUT CIRCULAR", font=f_body, fill=C_MUTED)
        draw.text((left_x + 60, left_y + 295), "Last Sighting: CAM-SRT-001 Surat Sahara Darwaja (11:45 AM)", font=f_mono, fill=C_RED)

        draw_card(draw, left_x + 35, left_y + 390, left_w - 70, 270, bg=C_CARD_INNER, border=C_GREEN, radius=8)
        draw.text((left_x + 60, left_y + 415), "AUTOMATED PATROL DISPATCH (PCR-SRT-12)", font=f_h2, fill=C_GREEN)
        draw.text((left_x + 60, left_y + 460), "Patrol Unit: Surat City Patrol Unit 12  |  Officer: Sub-Inspector R.K. Dave", font=f_body, fill=C_WHITE)
        draw.text((left_x + 60, left_y + 500), "ETA to Intercept: 3 MINUTES  |  Target Heading: Southbound Ring Road Market", font=f_mono, fill=C_GOLD_BRIGHT)
        draw.text((left_x + 60, left_y + 540), "Action: Surat Netram ICCC has established green wave corridor for PCR vehicle.", font=f_body, fill=C_WHITE)
        draw.text((left_x + 60, left_y + 580), "Status: DISPATCH ACKNOWLEDGED BY COMMAND TERMINAL", font=f_mono_sm, fill=C_GREEN)

    elif dtype == "dossier":
        draw_card(draw, left_x + 40, left_y + 105, left_w - 80, 545, bg=C_CARD_INNER, border=C_GREEN, radius=8)
        draw.text((left_x + 65, left_y + 130), "CERTIFICATE OF COMPUTER OUTPUT UNDER SECTION 65B INDIAN EVIDENCE ACT", font=f_h3, fill=C_WHITE)
        draw.text((left_x + 65, left_y + 170), "Target Subject: Vehicle GJ-01-AB-1234 (Mahindra Scorpio)  |  FIR-1120/2026/NAV", font=f_body_bold, fill=C_GOLD_BRIGHT)
        d_lines = [
            "1. Chain of Custody: Optical sensor raw frame ingested directly at Edge NVR with zero alteration.",
            "2. Cryptographic Digest: SHA-256 e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
            "3. Time Server Sync: National Physical Laboratory (NPL) Network Time Protocol (NTP) synchronized.",
            "4. Verifying Authority: Dr. Vikas Sahay, IPS • DGP & Director, SCRB Police Bhawan Gandhinagar",
            "5. Statutory Admissibility: Meets Supreme Court Arjun Panditrao Khotkar (2020) precedent rules.",
            "6. Certified Output: Official forensic dossier PDF generated and saved to C:\\Download path."
        ]
        dy = left_y + 220
        for dl in d_lines:
            draw.text((left_x + 65, dy), dl, font=f_body, fill=C_WHITE)
            dy += 45
        draw.rectangle([left_x + 65, dy + 15, left_x + 450, dy + 55], fill=C_NAVY)
        draw.text((left_x + 85, dy + 25), "DOWNLOAD PDF READY: C:\\Download", font=f_mono_sm, fill=C_GREEN)

    elif dtype == "gap":
        gaps = [
            ("GAP-001", "NH-56 Chhota Udepur Border Checkpost", "Inter-State Contraband Corridor", "Score: 94/100 (CRITICAL)"),
            ("GAP-002", "SH-41 Mehsana-Patan Rural Highway Junction", "Agricultural Supply Freight Route", "Score: 88/100 (HIGH)"),
            ("GAP-003", "Coastal Highway Coastal Strip Porbandar-Madhavpur", "Fisheries & Marine Police Boundary", "Score: 85/100 (HIGH)"),
            ("GAP-004", "Dholera SIR Outer Ring Road Expressway Cross", "Emerging Industrial Hub Corridor", "Score: 81/100 (MEDIUM)"),
            ("GAP-005", "NH-27 Samakhiali Junction Kutch Entry", "Freight Container Gateway Hub", "Score: 78/100 (MEDIUM)")
        ]
        gy = left_y + 105
        for gid, gtitle, gcat, gscore in gaps:
            draw_card(draw, left_x + 35, gy, left_w - 70, 95, bg=C_CARD_INNER, border=C_SKY, radius=6)
            draw.text((left_x + 55, gy + 15), gid, font=f_mono, fill=C_SKY)
            draw.text((left_x + 175, gy + 15), gtitle, font=f_body_bold, fill=C_WHITE)
            draw.text((left_x + 175, gy + 52), gcat, font=f_body, fill=C_MUTED)
            draw.text((left_x + 720, gy + 15), gscore, font=f_mono_sm, fill=C_GOLD_BRIGHT)
            draw.text((left_x + 720, gy + 52), "DEPLOYMENT RECOMMENDED", font=f_mono_sm, fill=C_GREEN)
            gy += 110

    elif dtype == "backend":
        apis = [
            ("GET", "/api/v1/health", "Statewide Grid & Dual-Engine Health Monitor", "200 OK (3ms)"),
            ("POST", "/api/v1/auth/login", "Bcrypt Hashed Officer JWT Token Authentication", "200 OK (12ms)"),
            ("GET", "/api/v1/cameras", "50 GIS Cameras Federated Across 26 Departments", "200 OK (8ms)"),
            ("GET", "/api/v1/vehicle/track?plate=GJ-01-AB-1234", "Chronological 5-Hop Traversal Correlator", "200 OK (14ms)"),
            ("GET", "/api/v1/alerts", "Active PCR Incident Alerting & Dispatch Index", "200 OK (6ms)"),
            ("GET", "/api/v1/watchlists", "VAHAN Stolen Vehicles & eGujCop Felon Records", "200 OK (5ms)"),
            ("GET", "/docs", "Interactive OpenAPI / Swagger UI Test Console", "200 OK (2ms)")
        ]
        ay = left_y + 105
        for meth, ep, desc, resp in apis:
            draw_card(draw, left_x + 35, ay, left_w - 70, 72, bg=C_CARD_INNER, border=C_BORDER, radius=6)
            draw.rectangle([left_x + 50, ay + 15, left_x + 115, ay + 50], fill=(6, 78, 59) if meth == "GET" else (30, 58, 138))
            draw.text((left_x + 60, ay + 22), meth, font=f_mono_sm, fill=C_WHITE)
            draw.text((left_x + 130, ay + 18), ep, font=f_mono, fill=C_WHITE)
            draw.text((left_x + 640, ay + 18), desc[:32], font=f_body, fill=C_MUTED)
            draw.text((left_x + 940, ay + 18), resp, font=f_mono_sm, fill=C_GREEN)
            ay += 80

    elif dtype == "roadmap":
        phases = [
            ("PHASE 1 (M1-M6) • CAPITAL CORRIDOR PILOT", "Deploy Model 5 at Gandhinagar SCRB & Ahmedabad Netram. Ingest 12,000 cameras.", C_SKY),
            ("PHASE 2 (M7-M14) • EXPRESSWAY & GOLDEN CORRIDOR", "Expand across Vadodara, Bharuch, Surat and NH-48 toll plazas. Ingest 35,000 cameras.", C_GREEN),
            ("PHASE 3 (M15-M24) • STATEWIDE 33 DISTRICT DEPLOYMENT", "Full statewide federation of 26 departments reaching 80,000+ CCTV camera network.", C_GOLD)
        ]
        py = left_y + 115
        for ptitle, pdesc, pcol in phases:
            draw_card(draw, left_x + 35, py, left_w - 70, 150, bg=C_CARD_INNER, border=pcol, radius=8)
            draw.text((left_x + 60, py + 22), ptitle, font=f_h2, fill=C_WHITE)
            draw.text((left_x + 60, py + 70), pdesc, font=f_body, fill=C_MUTED)
            draw.text((left_x + 60, py + 110), "STATUS: ARCHITECTURE & COMPLIANCE RIGOROUSLY VERIFIED", font=f_mono_sm, fill=pcol)
            py += 175

    narr_y = 905
    draw_card(draw, 35, narr_y, WIDTH - 70, 100, bg=C_NAVY_DARK, border=C_SKY, radius=8)
    draw.text((55, narr_y + 12), "🎙️ OFFICIAL WALKTHROUGH NARRATION TELEPROMPTER:", font=f_mono_sm, fill=C_GOLD_BRIGHT)
    draw.text((55, narr_y + 40), scene["narrative"], font=f_body_bold, fill=C_WHITE)

    foot_y = 1020
    draw.line([(35, foot_y), (WIDTH - 35, foot_y)], fill=C_BORDER, width=1)
    bar_w = int((WIDTH - 70) * global_progress)
    draw.line([(35, foot_y), (35 + bar_w, foot_y)], fill=C_GOLD_BRIGHT, width=3)

    cur_sec = int(global_frame / FPS)
    tot_sec = int(TOTAL_FRAMES / FPS)
    time_str = f"{cur_sec // 60:02d}:{cur_sec % 60:02d} / {tot_sec // 60:02d}:{tot_sec % 60:02d}"

    draw.text((35, foot_y + 12), "GUJARAT POLICE • HOME DEPARTMENT • GUJARAT POLICE INNOVATION CHALLENGE 2026", font=f_sub, fill=C_MUTED)
    draw.text((WIDTH // 2 - 80, foot_y + 12), f"SCENE {scene_idx + 1} OF {TOTAL_SCENES} ({time_str})", font=f_mono_sm, fill=C_GOLD_BRIGHT)
    draw.text((WIDTH - 280, foot_y + 12), f"FRAME {global_frame + 1} / {TOTAL_FRAMES}", font=f_mono_sm, fill=C_MUTED)

    return np.array(img)

print(f"[*] Rendering {TOTAL_SCENES} Scenes ({TOTAL_FRAMES} frames @ {FPS} FPS)...")
writer = imageio.get_writer(out_primary, fps=FPS, codec="libx264", quality=8, pixelformat="yuv420p")

for s_idx in range(TOTAL_SCENES):
    print(f"[*] Rendering Scene {s_idx + 1}/{TOTAL_SCENES}: {SCENES[s_idx]['title']}")
    for f_idx in range(FRAMES_PER_SCENE):
        frame = render_frame(s_idx, f_idx)
        writer.append_data(frame)

writer.close()
print("[OK] Walkthrough Video generated at:", out_primary)

for dest in out_copies:
    try:
        shutil.copyfile(out_primary, dest)
        print("[OK] Copied Walkthrough Video to:", dest)
    except Exception as e:
        print("[!] Copy failed:", dest, e)

sz_mb = os.path.getsize(out_primary) / (1024 * 1024)
print(f"[*] Walkthrough Video Generation 100% COMPLETE: {sz_mb:.2f} MB")
