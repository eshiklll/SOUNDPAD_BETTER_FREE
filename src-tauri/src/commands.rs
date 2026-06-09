use serde::{Deserialize, Serialize};
use std::fs::File;
use std::io::BufReader;
use rodio::{Decoder, OutputStream, Sink, DeviceTrait};
use cpal::traits::HostTrait;

#[derive(Serialize, Deserialize)]
pub struct AudioProcessResult {
    pub success: bool,
    pub file_path: Option<String>,
    pub error: Option<String>,
}

#[derive(Serialize, Deserialize)]
pub struct AudioDevice {
    pub name: String,
    pub is_default: bool,
}

#[tauri::command]
pub async fn get_audio_devices() -> Result<Vec<AudioDevice>, String> {
    let host = cpal::default_host();
    let default_device = host.default_output_device();
    let default_name = default_device.and_then(|d| d.name().ok()).unwrap_or_default();

    let mut devices = Vec::new();
    
    if let Ok(output_devices) = host.output_devices() {
        for device in output_devices {
            if let Ok(name) = device.name() {
                devices.push(AudioDevice {
                    is_default: name == default_name,
                    name,
                });
            }
        }
    }
    
    Ok(devices)
}

#[tauri::command]
pub async fn play_sound(file_path: String, target_device_name: Option<String>) -> Result<(), String> {
    // In a real app, we'd keep the OutputStream alive in the Tauri state.
    // For this MVP, we spawn a detached thread to play the audio.
    
    std::thread::spawn(move || {
        let host = cpal::default_host();
        let mut selected_device = host.default_output_device().expect("No default device found");
        
        if let Some(target_name) = target_device_name {
            if let Ok(devices) = host.output_devices() {
                for device in devices {
                    if let Ok(name) = device.name() {
                        if name == target_name {
                            selected_device = device;
                            break;
                        }
                    }
                }
            }
        }

        let (_stream, stream_handle) = OutputStream::try_from_device(&selected_device).unwrap();
        let sink = Sink::try_new(&stream_handle).unwrap();

        let file = File::open(&file_path).unwrap();
        let source = Decoder::new(BufReader::new(file)).unwrap();

        sink.append(source);
        sink.sleep_until_end();
    });

    Ok(())
}

#[tauri::command]
pub async fn download_audio(url: String, output_dir: String) -> AudioProcessResult {
    // Mock implementation for MVP
    println!("Simulating download from {} to {}", url, output_dir);
    
    AudioProcessResult {
        success: true,
        file_path: Some(format!("{}/mock_audio.mp3", output_dir)),
        error: None,
    }
}

#[tauri::command]
pub async fn apply_ffmpeg_effects(
    input_file: String,
    output_file: String,
    start_time: f32,
    duration: f32,
) -> AudioProcessResult {
    // Mock implementation for MVP
    println!("Simulating ffmpeg processing {} -> {} ({}s - {}s)", input_file, output_file, start_time, duration);
    
    AudioProcessResult {
        success: true,
        file_path: Some(output_file),
        error: None,
    }
}
