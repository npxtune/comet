use tauri::{AppHandle, Manager};
use tauri_plugin_window_state::{AppHandleExt, StateFlags};

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You are being logged in!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_websocket::init())
        .plugin(tauri_plugin_window_state::Builder::new().build())
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn close_app(app: AppHandle) {
    app.save_window_state(StateFlags::all())
        .expect("TODO: panic message");
    app.exit(0);
}
