"""Generate matching PDF and DOCX resumes. Run: py -3.12 scripts/build-resume.py"""
from pathlib import Path
from html import escape

from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.opc.constants import RELATIONSHIP_TYPE as RT
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_CENTER
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from pypdf import PdfReader

PUBLIC = Path(__file__).resolve().parents[1] / "public"
NAME = "AHMAD RAFI SUTANTO"
CONTACT = "Tangerang & Jakarta, Indonesia | +62 895-3831-57017 | rafisutanto@gmail.com"
PROFILES = "linkedin.com/in/rafisutanto | github.com/darflashxd | darflashxd.my.id"
BTL1_LABEL = "Blue Team Level 1 (BTL1)"
BTL1_URL = "https://www.credly.com/badges/9cdd0531-7a95-4d0c-8638-788d5d3ff3d8/public_url"

sections = [
    ("SUMMARY", [
        ("text", "BTL1-certified cybersecurity undergraduate at BINUS University focused on digital forensics and defensive security. Builds forensic challenges, privacy tools, and CTF infrastructure; seeking a cybersecurity internship."),
    ]),
    ("EDUCATION", [
        ("heading", "BINUS University, School of Computer Science | Cyber Security | 2024 - 2028 (Expected)"),
        ("text", "Jakarta, Indonesia | GPA: 3.23 / 4.00"),
    ]),
    ("RELEVANT EXPERIENCE & LEADERSHIP", [
        ("heading", "PETIR Cyber Security, BINUS University"),
        ("text", "Member | Oct 2026 - Present | Previously Apprentice | Mar - Oct 2026"),
        ("text", "Challenge Author (Digital Forensics) | Aug 2026"),
        ("bullet", "Authored forensic challenges for IFEST 2026 and BeeCTF 2026, covering LUKS encryption, ext4 carving, and a simulated malicious AUR package."),
        ("bullet", "Prepared reference writeups and validation solvers, documenting Linux CLI and FTK Imager investigation workflows."),
        ("heading", "Deputy Coordinator, R&D | Cyber Security Community, BINUS | Oct 2025 - Present"),
        ("bullet", "Coordinate authors across six CTF categories and review contributions for technical accuracy and solvability."),
        ("bullet", "Built GitHub Actions workflows to sync challenge metadata with CTFd via ctfcli and deploy Docker services to a VPS over SSH."),
        ("heading", "Project Officer | National Cyber Week 2025, CSC BINUS | Oct - Dec 2025"),
        ("bullet", "Coordinated competition operations, an on-site IoT hacking final, and workshops on web penetration testing and adversarial AI."),
        ("heading", "R&D Activist | Cyber Security Community, BINUS | Feb - Sep 2025"),
        ("bullet", "Authored file-carving challenges for CSC CTF 2025 and mentored junior members on Volatility and Wireshark investigation workflows."),
    ]),
    ("SELECTED PROJECTS", [
        ("heading", "PomiCat - Privacy tooling for AI chats and documents"),
        ("link", "github.com/darflashxd/pomicat"),
        ("bullet", "Built a browser extension that detects and redacts PII and derived financial values in AI chats and documents, with client-side AES-256-GCM encryption and a Cloudflare Workers relay that stores ciphertext."),
        ("bullet", "Documented an evaluation across 3 LLMs and 160 fictional chat runs; added arithmetic checks, Googlebot crawler tests, and Chrome/Firefox release builds."),
        ("link", "darflashxd.github.io/pomicat/blog"),
        ("heading", "The Poisoned AUR - BeeCTF 2026 digital forensics challenge"),
        ("link", "github.com/PETIRsec/beefest-2026-qual"),
        ("bullet", "Designed an Arch Linux compromise simulation requiring correlation of package logs, shell history, systemd journal entries, ELF binaries, and extended attributes (xattr) to reconstruct the attack timeline."),
        ("heading", "PulmoAI - Chest X-ray classification"),
        ("link", "github.com/darflashxd/pulmoai"),
        ("bullet", "Replaced a VGG-style CNN with MobileNetV2 using transfer learning in a Flask and React app. Academic project, not a clinical diagnostic tool."),
    ]),
    ("TECHNICAL SKILLS", [
        ("text", "Forensics & IR: Volatility 3, Autopsy, FTK Imager, Eric Zimmerman Tools, Wireshark; Windows/Linux artifact analysis"),
        ("text", "Detection & SIEM: Splunk, Sysmon, Windows Event Logs (EVTX), YARA Rules, Sigma Rules"),
        ("text", "Development: Python, Bash, JavaScript/TypeScript, WebCrypto, Cloudflare Workers, Git, Docker, GitHub Actions, ctfcli"),
        ("text", "Reverse Engineering: Ghidra, x64dbg, JADX, APKTool"),
        ("text", "Frameworks: MITRE ATT&CK, NIST SP 800-61, OWASP Top 10"),
    ]),
    ("CERTIFICATIONS & AWARDS", [
        ("credential", "Blue Team Level 1 (BTL1) | Security Blue Team | Nov 2026 | Credential ID: 710141939"),
        ("text", "Finalist - Wreck-IT 7.0, General Capture The Flag | Poltek SSN | Aug 2026 | Team HM Plenger"),
        ("link", "darflashxd.my.id/certificates/cert-wreckit-finalist.pdf"),
    ]),
]


def link_url(label):
    if "@" in label:
        return "mailto:" + label
    if label.startswith("+62"):
        return "tel:" + label.replace(" ", "").replace("-", "")
    if "." in label:
        return "https://" + label
    return None


def add_link(paragraph, label, url):
    hyperlink = OxmlElement("w:hyperlink")
    hyperlink.set(qn("r:id"), paragraph.part.relate_to(url, RT.HYPERLINK, is_external=True))
    run = OxmlElement("w:r")
    node = OxmlElement("w:t")
    node.text = label
    run.append(node)
    hyperlink.append(run)
    paragraph._p.append(hyperlink)


doc = Document()
section = doc.sections[0]
section.top_margin = section.bottom_margin = Inches(0.42)
section.left_margin = section.right_margin = Inches(0.5)
section.page_width, section.page_height = Inches(8.27), Inches(11.69)
normal = doc.styles["Normal"]
normal.font.name, normal.font.size = "Calibri", Pt(10.5)
normal.font.color.rgb = RGBColor(0, 0, 0)
normal.paragraph_format.space_after = Pt(1)
normal.paragraph_format.line_spacing = 1.0
normal.paragraph_format.widow_control = True

pdfmetrics.registerFont(TTFont("Calibri", "C:/Windows/Fonts/calibri.ttf"))
pdfmetrics.registerFont(TTFont("Calibri-Bold", "C:/Windows/Fonts/calibrib.ttf"))
base = ParagraphStyle("body", fontName="Calibri", fontSize=10.5, leading=12, spaceAfter=1.5)
styles = {
    "text": base,
    "bullet": ParagraphStyle("bullet", parent=base, leftIndent=10, firstLineIndent=-7),
    "heading": ParagraphStyle("heading", parent=base, fontName="Calibri-Bold", spaceBefore=1.5, keepWithNext=True),
    "link": ParagraphStyle("link", parent=base, fontSize=10, leading=11),
    "credential": base,
}
story = []
for text in [NAME, CONTACT, PROFILES]:
    paragraph = doc.add_paragraph()
    paragraph.alignment = 1
    if text == NAME:
        run = paragraph.add_run(text)
        run.bold, run.font.size = True, Pt(16)
        content = escape(text)
    else:
        labels = text.split(" | ")
        for index, label in enumerate(labels):
            if index:
                paragraph.add_run(" | ")
            url = link_url(label)
            if url:
                add_link(paragraph, label, url)
            else:
                paragraph.add_run(label)
        content = " | ".join(
            f'<link href="{escape(link_url(label), quote=True)}">{escape(label)}</link>'
            if link_url(label) else escape(label) for label in labels
        )
    story.append(Paragraph(content, ParagraphStyle(
        "header", fontName="Calibri-Bold" if text == NAME else "Calibri",
        fontSize=16 if text == NAME else 10, leading=19 if text == NAME else 11,
        alignment=TA_CENTER, spaceAfter=2,
    )))
story.append(Spacer(1, 3))

for title, entries in sections:
    paragraph = doc.add_paragraph()
    paragraph.paragraph_format.space_before = Pt(4)
    paragraph.paragraph_format.keep_with_next = True
    paragraph.add_run(title).bold = True
    story.append(Paragraph(escape(title), ParagraphStyle(
        "section", parent=base, fontName="Calibri-Bold", spaceBefore=5, keepWithNext=True,
    )))
    for kind, text in entries:
        paragraph = doc.add_paragraph()
        content = escape(text)
        if kind == "credential":
            add_link(paragraph, BTL1_LABEL, BTL1_URL)
            paragraph.add_run(text[len(BTL1_LABEL):])
            content = f'<link href="{BTL1_URL}">{BTL1_LABEL}</link>' + escape(text[len(BTL1_LABEL):])
        elif kind == "link":
            add_link(paragraph, text, link_url(text))
            content = f'<link href="{escape(link_url(text), quote=True)}">{content}</link>'
            paragraph.paragraph_format.keep_with_next = True
        else:
            run = paragraph.add_run(("• " if kind == "bullet" else "") + text)
            if kind == "heading":
                run.bold = True
                paragraph.paragraph_format.space_before = Pt(1.5)
                paragraph.paragraph_format.keep_with_next = True
            if kind == "bullet":
                paragraph.paragraph_format.left_indent = Pt(10)
                paragraph.paragraph_format.first_line_indent = Pt(-7)
        story.append(Paragraph(("• " if kind == "bullet" else "") + content, styles[kind]))

pdf_path = PUBLIC / "Resume_Ahmad_Rafi_Sutanto.pdf"
SimpleDocTemplate(str(pdf_path), pagesize=(595.28, 841.89), leftMargin=36, rightMargin=36,
                  topMargin=30, bottomMargin=30).build(story)
reader = PdfReader(pdf_path)
assert len(reader.pages) == 1, f"Resume must fit one page; got {len(reader.pages)}"
text = reader.pages[0].extract_text()
assert all(item in text for item in [NAME, "PomiCat", "pomicat/blog", "BTL1-certified", "710141939", "PETIR", "PulmoAI", "2024 - 2028 (Expected)"])
assert "not yet earned" not in text and "preparation in progress" not in text
assert "\ufffd" not in text and text.count("Finalist") == 1
uris = [a.get_object()["/A"]["/URI"] for p in reader.pages for a in p.get("/Annots", [])]
assert len(uris) == 11 and BTL1_URL in uris and all(u.startswith(("https://", "mailto:", "tel:")) for u in uris)
doc.save(PUBLIC / "CV_Ahmad_Rafi_Sutanto.docx")
print("PASS: one-page PDF and editable DOCX generated; BTL1 earned; 11 active links")
