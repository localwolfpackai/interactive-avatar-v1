from playwright.sync_api import sync_playwright
import os

def run_cuj(page):
    # Log page to see what's rendering
    page.goto("http://localhost:3000")
    page.wait_for_timeout(2000)

    print("Page title:", page.title())
    print("Page content:", page.content()[:500])

    # Take screenshot of whatever is there
    page.screenshot(path="/home/jules/verification/screenshots/debug.png")

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