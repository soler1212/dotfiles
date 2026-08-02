package main

import (
	"encoding/json"
	"fmt"
	"os"
)

type User struct {
	ID    int    `json:"id"`
	Name  string `json:"name"`
	Email string `json:"email"`
	Role  string `json:"role"`
}

type Config struct {
	Database DatabaseConfig `json:"database"`
	Server   ServerConfig   `json:"server"`
	Features []string       `json:"features"`
}

type DatabaseConfig struct {
	Host     string `json:"host"`
	Port     int    `json:"port"`
	Name     string `json:"name"`
	MaxConns int    `json:"max_connections"`
}

type ServerConfig struct {
	Port    int      `json:"port"`
	Host    string   `json:"host"`
	Origins []string `json:"origins"`
}

func main() {
	users := []User{
		{ID: 1, Name: "Alice", Email: "alice@example.com", Role: "admin"},
		{ID: 2, Name: "Bob", Email: "bob@example.com", Role: "user"},
		{ID: 3, Name: "Charlie", Email: "charlie@example.com", Role: "user"},
	}

	config := Config{
		Database: DatabaseConfig{
			Host:     "localhost",
			Port:     5432,
			Name:     "myapp",
			MaxConns: 100,
		},
		Server: ServerConfig{
			Port:    8080,
			Host:    "0.0.0.0",
			Origins: []string{"http://localhost:3000", "https://app.example.com"},
		},
		Features: []string{"auth", "analytics", "notifications"},
	}

	// Print JSON output
	jsonData, err := json.MarshalIndent(config, "", "  ")
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error marshaling JSON: %v\n", err)
		os.Exit(1)
	}
	fmt.Println(string(jsonData))

	// Simulate processing users
	for _, user := range users {
		fmt.Printf("Processing user: %s (%s)\n", user.Name, user.Role)
	}
}
