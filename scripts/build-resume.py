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
        ("text", "Cybersecurity undergraduate at BINUS University with hands-on experience developing forensic challenges, building privacy tools, and automating CTF infrastructure. Seeking an internship in digital forensics, security operations, or defensive security tooling."),
    ]),
    ("EDUCATION", [
        ("heading", "BINUS University | Computer Science, Cyber Security | 2024–2028 (expected)"),
        ("text", "Jakarta, Indonesia | GPA: 3.23 / 4.00"),
    ]),
    ("RELEVANT EXPERIENCE", [
        ("heading", "Apprentice & Digital Forensics Challenge Author | PETIR Cyber Security | Mar 2026–Present"),
        ("bullet", "Developed forensic challenges for IFEST 2026 and BeeCTF 2026, covering encrypted Linux volumes, filesystem carving, and a simulated malicious AUR package."),
        ("bullet", "Prepared reference writeups and validated intended investigation paths and solutions."),
        ("heading", "Deputy Coordinator, R&D | Cyber Security Community, BINUS | Oct 2025–Present"),
        ("bullet", "Coordinate challenge authors and review contributions across competition categories."),
        ("bullet", "Built GitHub Actions workflows to synchronize challenge metadata with CTFd through ctfcli and deploy Docker services to a VPS over SSH."),
        ("heading", "Project Officer | National Cyber Week, CSC BINUS | Oct–Dec 2025"),
        ("bullet", "Coordinated competition operations, an on-site IoT hacking final, and workshops on web security and adversarial AI."),
        ("heading", "R&D Activist | Cyber Security Community, BINUS | Feb–Sep 2025"),
        ("bullet", "Authored file-carving challenges for CSC CTF 2025 and supported practical learning with Volatility and Wireshark."),
    ]),
    ("SELECTED PROJECTS", [
        ("heading", "SafeShare | Privacy tooling for AI conversations"),
        ("link", "https://github.com/darflashxd/safeshare"),
        ("bullet", "Built a browser extension to detect and redact sensitive information in AI conversations, with a review interface for adjusting redactions before sharing."),
        ("bullet", "Implemented client-side AES-256-GCM encryption with WebCrypto and a sharing service using Cloudflare Workers. Available for users; development ongoing."),
        ("heading", "The Poisoned AUR | BeeCTF 2026 digital forensics challenge"),
        ("link", "https://github.com/PETIRsec/beefest-2026-qual"),
        ("bullet", "Created a simulated Arch Linux package compromise with evidence across package logs, shell history, systemd, ELF binaries, and extended attributes; documented CLI and FTK Imager investigation paths."),
    ]),
    ("TECHNICAL SKILLS", [
        ("text", "Forensics: Volatility 3, Autopsy, FTK Imager, Eric Zimmerman Tools, Wireshark; Windows/Linux artifacts"),
        ("text", "Detection: Splunk, Sysmon, Windows Event Logs | Development: Python, Bash, TypeScript, Git"),
        ("text", "Infrastructure: Linux, Docker, GitHub Actions, ctfcli | Concepts: MITRE ATT&CK, incident response"),
    ]),
    ("AWARDS & PROFESSIONAL DEVELOPMENT", [
        ("text", "Finalist, Wreck-IT 7.0 General CTF | Politeknik Siber dan Sandi Negara | Aug 2026 | Team HM Plenger"),
        ("text", "Blue Team Level 1 (BTL1), Security Blue Team — exam preparation in progress; certification not yet earned."),
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
normal.font.name, normal.font.size = "Calibri", Pt(10.5)
normal.paragraph_format.space_after = Pt(3)
normal.paragraph_format.line_spacing = 1.0
for text in [name, contact, profiles]:
    paragraph = doc.add_paragraph(text)
    paragraph.alignment = 1
    if text == name:
        paragraph.runs[0].bold = True
        paragraph.runs[0].font.size = Pt(18)

base = ParagraphStyle("body", fontName="Helvetica", fontSize=10, leading=12, spaceAfter=3)
styles = {
    "text": base,
    "bullet": ParagraphStyle("bullet", parent=base, leftIndent=10, firstLineIndent=-7),
    "heading": ParagraphStyle("heading", parent=base, fontName="Helvetica-Bold", spaceBefore=3),
    "link": ParagraphStyle("link", parent=base, fontSize=9, leading=11, textColor=colors.HexColor("#244970")),
}
story = [Paragraph(name, ParagraphStyle("name", parent=base, fontName="Helvetica-Bold", fontSize=18, leading=22, alignment=TA_CENTER))]
for text in [contact, profiles]:
    story.append(Paragraph(escape(text), ParagraphStyle("contact" + text[:3], parent=base, fontSize=9, leading=11, alignment=TA_CENTER)))
story.append(Spacer(1, 5))

for title, entries in sections:
    paragraph = doc.add_paragraph()
    paragraph.paragraph_format.space_before = Pt(7)
    paragraph.add_run(title).bold = True
    story.append(Paragraph(title, ParagraphStyle(title, parent=base, fontName="Helvetica-Bold", fontSize=10, spaceBefore=7, spaceAfter=4)))
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
assert all(term in text for term in [name, "SafeShare", "not yet earned", "PETIR"])
assert "Designed 30+" not in text
doc.save(PUBLIC / "CV_Ahmad_Rafi_Sutanto.docx")
print("PASS: one-page, text-readable PDF and editable DOCX generated")
