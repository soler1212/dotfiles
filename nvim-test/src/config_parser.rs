use std::collections::HashMap;
use std::fs;
use std::path::Path;

#[derive(Debug, Clone)]
struct Config {
    name: String,
    values: HashMap<String, String>,
}

impl Config {
    fn new(name: &str) -> Self {
        Config {
            name: name.to_string(),
            values: HashMap::new(),
        }
    }

    fn set(&mut self, key: &str, value: &str) {
        self.values.insert(key.to_string(), value.to_string());
    }

    fn get(&self, key: &str) -> Option<&String> {
        self.values.get(key)
    }

    fn load_from_file<P: AsRef<Path>>(path: P) -> Result<Self, Box<dyn std::error::Error>> {
        let content = fs::read_to_string(path)?;
        let mut config = Config::new("loaded");
        for line in content.lines() {
            if let Some((key, value)) = line.split_once('=') {
                config.set(key.trim(), value.trim());
            }
        }
        Ok(config)
    }

    fn save_to_file<P: AsRef<Path>>(&self, path: P) -> Result<(), Box<dyn std::error::Error>> {
        let content = self
            .values
            .iter()
            .map(|(k, v)| format!("{}={}", k, v))
            .collect::<Vec<_>>()
            .join("\n");
        fs::write(path, content)?;
        Ok(())
    }
}

fn main() {
    let mut config = Config::new("app");
    config.set("host", "localhost");
    config.set("port", "8080");
    config.set("debug", "true");

    println!("Config: {:?}", config);

    if let Some(host) = config.get("host") {
        println!("Host: {}", host);
    }

    // Save and load example
    if let Err(e) = config.save_to_file("/tmp/config.txt") {
        eprintln!("Error saving: {}", e);
    }

    match Config::load_from_file("/tmp/config.txt") {
        Ok(loaded) => println!("Loaded: {:?}", loaded),
        Err(e) => eprintln!("Error loading: {}", e),
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_config_creation() {
        let mut config = Config::new("test");
        config.set("key", "value");
        assert_eq!(config.get("key"), Some(&"value".to_string()));
    }

    #[test]
    fn test_nonexistent_key() {
        let config = Config::new("test");
        assert_eq!(config.get("nonexistent"), None);
    }
}
