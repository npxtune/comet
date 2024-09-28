use tauri::{AppHandle, Manager, WebviewUrl, WebviewWindowBuilder};
use tauri_plugin_window_state::{AppHandleExt, WindowExt, StateFlags};

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You are being logged in!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_window_state::Builder::new().build())
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![greet])
        .setup(|app| {
            let win_builder = WebviewWindowBuilder::new(app, "main", WebviewUrl::default())
                .title("Comet")
                .inner_size(800.0, 600.0);
                // .transparent(true);

            //  Windows Blur
            #[cfg(target_os = "windows")]
            {
                use tauri::{TitleBarStyle};
                let win_builder = win_builder.title_bar_style(TitleBarStyle::Transparent);
            }

            //  MacOS Blur
            #[cfg(target_os = "macos")]
            {
                use tauri::{TitleBarStyle};
                let win_builder = win_builder.title_bar_style(TitleBarStyle::Transparent);
            }

            let window = win_builder.build().unwrap();

            //  Windows Blur
            #[cfg(target_os = "windows")]
            {
                let win_builder = win_builder.title_bar_style(TitleBarStyle::Transparent);
                apply_blur(&window, Some((18, 18, 18, 125)))
                    .expect("Unsupported platform! 'apply_blur' is only supported on Windows");
            }

            //  MacOS Blur
            #[cfg(target_os = "macos")]
            {
                use cocoa::appkit::{NSWindow, NSWindowStyleMask, NSWindowTitleVisibility};
                use cocoa::base::id;
                use window_vibrancy::{apply_vibrancy, NSVisualEffectMaterial};
                apply_vibrancy(&window, NSVisualEffectMaterial::HudWindow, None, None)
                    .expect("Unsupported platform! 'apply_vibrancy' is only supported on macOS");
                let ns_window = window.ns_window().unwrap() as id;
                unsafe {
                    let mut style_mask = ns_window.styleMask();
                    style_mask.set(NSWindowStyleMask::NSFullSizeContentViewWindowMask, true);
                    ns_window.setStyleMask_(style_mask);
                    ns_window.setTitleVisibility_(NSWindowTitleVisibility::NSWindowTitleVisible);
                    ns_window.setTitlebarAppearsTransparent_(cocoa::base::YES);
                }
            }

            window.restore_state(StateFlags::VISIBLE).expect("TODO: panic message");
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn close_app(app: AppHandle) {
    app.save_window_state(StateFlags::all()).expect("TODO: panic message");
    app.exit(0);
}