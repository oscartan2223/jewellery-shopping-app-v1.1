import socket
import tkinter as tk
import ast

# Connect to the backend server to get the data
def fetch_data():
    client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    client.connect(('localhost', 9449))  # Connect to the backend on localhost:9449 (Fix port)
    client.send('GET_DATA'.encode('utf-8'))  # Request the tracking data
    response = client.recv(1024).decode('utf-8')
    client.close()
    return response

# Parse the data into a dictionary
def parse_data(data):
    try:
        # Convert the string representation of dictionary into a real dictionary
        app_times = ast.literal_eval(data)
        return app_times
    except Exception as e:
        print(f"Error parsing data: {e}")
        return {}

# Update the GUI with the latest data
def update_gui():
    data = fetch_data()
    app_times = parse_data(data)

    # Clear previous data and display updated times
    display_text = ""
    for app, time_spent in app_times.items():
        display_text += f"{app}: {time_spent:.2f} seconds\n"

    label.config(text=display_text)  # Display the data in the GUI
    root.after(5000, update_gui)  # Refresh every 5 seconds

# GUI setup
root = tk.Tk()
root.title("Game Tracker")

label = tk.Label(root, text="Waiting for data...", font=("Helvetica", 16))
label.pack(padx=20, pady=20)

# Start the GUI update loop
update_gui()

root.mainloop()
