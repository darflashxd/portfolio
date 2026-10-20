"""Generate matching, text-based PDF and editable DOCX. Run: py -3.12 scripts/build-resume.py"""
from pathlib import Path
from html import escape

from docx import Document
from docx.shared import Inches, Pt
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_CENTER
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from pypdf import PdfReader

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"

sections = [
    ("SUMMARY", [
        ("text", "Cybersecurity undergraduate at BINUS University with hands-on experience in digital forensics challenge authoring, privacy tooling development, and CTF infrastructure automation. Finalist at Wreck-IT 7.0 national cyber competition. Seeking an internship in digital forensics, security operations, or defensive security engineering."),
    ]),
    ("EDUCATION", [
        ("heading", "BINUS University | B.S. Computer Science, Cyber Security | 2024–2028 (expected)"),
        ("text", "Jakarta, Indonesia | GPA: 3.23 / 4.00"),
    ]),
    ("RELEVANT EXPERIENCE", [
        ("heading", "Apprentice & Digital Forensics Challenge Author | PETIR Cyber Security | Mar 2026–Present"),
        ("bullet", "Developed forensic challenges for IFEST 2026 (Universitas Padjadjaran) and BeeCTF 2026: LUKS volume encryption, ext4 artifact carving, and a simulated malicious Arch Linux AUR package with multi-layer evidence trails."),
        ("bullet", "Authored reference writeups covering both Linux CLI and FTK Imager investigation paths; built automated validation solvers to guarantee challenge integrity."),
        ("heading", "Deputy Coordinator, R&D | Cyber Security Community, BINUS | Oct 2025–Present"),
        ("bullet", "Coordinate challenge authors across six competition categories and review contributions for technical accuracy and solvability."),
        ("bullet", "Built GitHub Actions CI/CD workflows that auto-sync challenge metadata to CTFd via ctfcli and deploy Docker services to VPS over SSH, eliminating manual deployment on competition day."),
        ("heading", "Project Officer | National Cyber Week 2025, CSC BINUS | Oct–Dec 2025"),
        ("bullet", "Led event operations for 200+ national university participants, including an on-site IoT Hacking CTF final and workshops on web penetration testing and adversarial AI."),
        ("heading", "R&D Activist | Cyber Security Community, BINUS | Feb–Sep 2025"),
        ("bullet", "Authored file-carving forensics challenges for CSC CTF 2025 and mentored junior members on Volatility and Wireshark investigation workflows."),
    ]),
    ("SELECTED PROJECTS", [
        ("heading", "SafeShare — Privacy tooling for AI conversations"),
        ("link", "github.com/darflashxd/safeshare"),
        ("bullet", "Built a browser extension that detects and redacts sensitive information (credentials, PII, API keys) in AI conversations, with a review interface for adjusting redactions before sharing."),
        ("bullet", "Implemented client-side AES-256-GCM encryption via WebCrypto and a sharing service on Cloudflare Workers with ephemeral burn-after-reading links. Available for users; actively developed."),
        ("heading", "The Poisoned AUR — BeeCTF 2026 digital forensics challenge"),
        ("link", "github.com/PETIRsec/beefest-2026-qual"),
        ("bullet", "Simulated an Arch Linux package compromise requiring correlation across package logs, shell history, systemd journal, ELF binaries, and extended file attributes (xattr) to reconstruct the full attack timeline."),
        ("heading", "PulmoAI — Tuberculosis chest X-ray detection"),
        ("link", "github.com/darflashxd/pulmoai"),
        ("bullet", "Optimized CNN model from VGG to MobileNetV2 via transfer learning, reducing model size by 90% while achieving 99.65% validation accuracy. Full-stack app with Flask backend and React frontend."),
    ]),
    ("TECHNICAL SKILLS", [
        ("text", "Forensics & IR: Volatility 3, Autopsy, FTK Imager, Eric Zimmerman Tools, Wireshark; Windows/Linux artifact analysis"),
        ("text", "Detection & SIEM: Splunk, Sysmon, Windows Event Logs (EVTX), YARA Rules, Sigma Rules"),
        ("text", "Development: Python, Bash, TypeScript, Git, Docker, GitHub Actions, ctfcli"),
        ("text", "Reverse Engineering: Ghidra, x64dbg, JADX, APKTool"),
        ("text", "Frameworks: MITRE ATT&CK, NIST SP 800-61, OWASP Top 10"),
    ]),
    ("AWARDS & COMPETITIONS", [
        ("text", "Finalist, Wreck-IT 7.0 General CTF | Politeknik Siber dan Sandi Negara (BSSN) | Aug 2026 | Team HM Plenger"),
        ("text", "Competitor: GEMASTIK (Kemendikbudristek), FindIT! (UGM), IFEST (UNPAD), Polri Cyber CTF, Gundar CTF | 2025–2026"),
    ]),
    ("PROFESSIONAL DEVELOPMENT", [
        ("text", "Blue Team Level 1 (BTL1), Security Blue Team — exam preparation in progress; certification not yet earned."),
        ("text", "6 published CTF writeups covering digital forensics, memory analysis, and web exploitation (darflashxd.my.id)"),
    ]),
]

name = "AHMAD RAFI SUTANTO"
contact = "Tangerang & Jakarta, Indonesia | +62 895-3831-57017 | rafisutanto@gmail.com"
profiles = "linkedin.com/in/rafisutanto | github.com/darflashxd | darflashxd.my.id"

doc = Document()
section = doc.sections[0]
section.top_margin = section.bottom_margin = Inches(0.5)
section.left_margin = section.right_margin = Inches(0.6)
section.page_width, section.page_height = Inches(8.27), Inches(11.69)
normal = doc.styles["Normal"]
normal.font.name, normal.font.size = "Calibri", Pt(10)
normal.paragraph_format.space_after = Pt(2)
normal.paragraph_format.line_spacing = 1.0
for text in [name, contact, profiles]:
    paragraph = doc.add_paragraph(text)
    paragraph.alignment = 1
    if text == name:
        paragraph.runs[0].bold = True
        paragraph.runs[0].font.size = Pt(16)

base = ParagraphStyle("body", fontName="Helvetica", fontSize=9.5, leading=11.5, spaceAfter=2)
styles = {
    "text": base,
    "bullet": ParagraphStyle("bullet", parent=base, leftIndent=10, firstLineIndent=-7),
    "heading": ParagraphStyle("heading", parent=base, fontName="Helvetica-Bold", spaceBefore=2),
    "link": ParagraphStyle("link", parent=base, fontSize=8.5, leading=10, textColor=colors.HexColor("#244970")),
}
story = [Paragraph(name, ParagraphStyle("name", parent=base, fontName="Helvetica-Bold", fontSize=16, leading=19, alignment=TA_CENTER))]
for text in [contact, profiles]:
    story.append(Paragraph(escape(text), ParagraphStyle("contact" + text[:3], parent=base, fontSize=8.5, leading=10, alignment=TA_CENTER)))
story.append(Spacer(1, 3))

for title, entries in sections:
    paragraph = doc.add_paragraph()
    paragraph.paragraph_format.space_before = Pt(5)
    paragraph.add_run(title).bold = True
    story.append(Paragraph(title, ParagraphStyle(title, parent=base, fontName="Helvetica-Bold", fontSize=9.5, spaceBefore=5, spaceAfter=2)))
    for kind, text in entries:
        paragraph = doc.add_paragraph(("• " if kind == "bullet" else "") + text)
        if kind == "heading":
            paragraph.runs[0].bold = True
            paragraph.paragraph_format.keep_with_next = True
        content = escape(text)
        if kind == "link":
            content = f'<link href="{text}">{content}</link>'
        story.append(Paragraph(("• " if kind == "bullet" else "") + content, styles[kind]))

pdf_path = PUBLIC / "Resume_Ahmad_Rafi_Sutanto.pdf"
SimpleDocTemplate(str(pdf_path), pagesize=(595.28, 841.89), leftMargin=36, rightMargin=36, topMargin=30, bottomMargin=30).build(story)
reader = PdfReader(pdf_path)
assert len(reader.pages) == 1, f"Resume must fit one page, got {len(reader.pages)}"
text = reader.pages[0].extract_text()
assert all(term in text for term in [name, "SafeShare", "not yet earned", "PETIR", "PulmoAI", "MITRE", "YARA", "Ghidra", "OWASP"])
assert "Designed 30+" not in text
doc.save(PUBLIC / "CV_Ahmad_Rafi_Sutanto.docx")
print("PASS: one-page, text-readable PDF and editable DOCX generated")
