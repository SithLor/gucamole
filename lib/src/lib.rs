mod utils;

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub fn fast_slope(x1: f64, y1: f64, x2: f64, y2: f64) -> f64 {
    (y2 - y1) / (x2 - x1)
}

#[wasm_bindgen]
pub fn slope_angle(x1: f64, y1: f64, x2: f64, y2: f64) -> f64 {
    let slope = fast_slope(x1, y1, x2, y2);
    slope.atan();
    if (180.0 * slope.atan() / std::f64::consts::PI) < 0.0 {
        180.0 + (180.0 * slope.atan() / std::f64::consts::PI)
    } else {
        180.0 * slope.atan() / std::f64::consts::PI
    }
}