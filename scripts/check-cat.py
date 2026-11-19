"""Run: python scripts/check-cat.py http://localhost:3000 (requires Playwright)."""
import sys
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    for width in (390, 768, 1440):
        page = browser.new_page(viewport={"width": width, "height": 1000})
        page.goto(sys.argv[1] if len(sys.argv) > 1 else "http://localhost:3000", wait_until="networkidle")
        stage = page.locator(".cat-stage")
        stage.scroll_into_view_if_needed()
        page.wait_for_function('document.querySelector(".cat-stage").dataset.paused === "false"')
        assert page.locator(".cat-traveler").count() == 2
        assert page.locator(".cat-character").count() == 0
        pause = page.get_by_role("button", name="Pause animations", exact=True)
        pause.focus()
        page.keyboard.press("Enter")
        assert stage.get_attribute("data-paused") == "true"
        page.get_by_role("button", name="Resume animations", exact=True).click()
        assert stage.get_attribute("data-paused") == "false"
        page.emulate_media(reduced_motion="reduce")
        page.wait_for_function('document.querySelector(".cat-stage").dataset.paused === "true"')
        assert page.locator(".cat-traveler").first.evaluate('(e)=>getComputedStyle(e).animationName') == "none"
        assert not page.evaluate("document.documentElement.scrollWidth > innerWidth")
        print(f"PASS {width}px: two automatic cats, pause/resume, reduced motion, no overflow")
        page.close()
    browser.close()
