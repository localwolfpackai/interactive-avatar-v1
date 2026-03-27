from playwright.sync_api import sync_playwright
import os

def run_cuj(page):
    # Log page to see what's rendering
    page.goto("http://localhost:3000")
    page.wait_for_timeout(2000)

    # 1. AI Guides
    page.get_by_text("AI Guides").click()
    page.wait_for_timeout(2000)

    next_btn = page.locator("button:has-text('Next Step')")
    if next_btn.is_visible():
        next_btn.click()
        page.wait_for_timeout(1000)
        next_btn.click()
        page.wait_for_timeout(1000)

    page.screenshot(path="/home/jules/verification/screenshots/ai_guides.png")

    # 2. Flow Stories
    page.get_by_text("Flow Stories").click()
    page.wait_for_timeout(2000)

    page.evaluate("window.scrollBy(0, window.innerHeight)")
    page.wait_for_timeout(1000)
    page.screenshot(path="/home/jules/verification/screenshots/flow_stories.png")

    # 3. Playground
    page.get_by_text("Playground").click()
    page.wait_for_timeout(2000)

    btn = page.locator("button:has-text('Play with Physics')")
    if btn.is_visible():
        btn.hover()
        page.wait_for_timeout(1000)

    page.screenshot(path="/home/jules/verification/screenshots/playground.png")

if __name__ == "__main__":
    os.makedirs("/home/jules/verification/videos", exist_ok=True)
    os.makedirs("/home/jules/verification/screenshots", exist_ok=True)

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            record_video_dir="/home/jules/verification/videos",
            viewport={"width": 1280, "height": 720}
        )
        page = context.new_page()
        try:
            run_cuj(page)
        finally:
            context.close()
            browser.close()