import psutil
import time
import socket
import threading
import os

# Track the time for each application in memory
app_times = {}
start_times = {}

# Dynamic path for application.txt
def get_dynamic_path():
    """Get the dynamic path to the GameTracker folder, based on where the script is located."""
    current_dir = os.path.dirname(os.path.abspath(__file__))
    game_tracker_path = os.path.join(current_dir, 'GameTracker', 'application.txt')
    return game_tracker_path

def load_applications():
    """Load applications to be tracked from a dynamically determined file path."""
    app_file_path = get_dynamic_path()
    if not os.path.exists(app_file_path):
        return []
    
    with open(app_file_path, 'r') as file:
        apps = file.readlines()
    
    return [app.strip() for app in apps]

def check_app_status(app_name):
    """Check if the application is currently running."""
    for proc in psutil.process_iter(['name']):
        if proc.info['name'].lower() == app_name.lower():
            return True
    return False

def write_to_file(app_name, total_time):
    """Write the total time spent on the application to the file."""
    timeline_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'GameTracker', 'timeline.txt')
    with open(timeline_path, 'a') as file:
        file.write(f"{app_name} - {total_time:.2f}\n")

def track_app_times():
    """Track the time spent on each application."""
    apps = load_applications()  # List of applications to track

    while True:
        for app in apps:
            if app not in start_times:
                if check_app_status(app):  # Only start timing if the app is running
                    start_times[app] = time.time()
            elif not check_app_status(app):
                # If app is not running anymore, calculate the elapsed time
                elapsed_time = time.time() - start_times.pop(app)
                app_times[app] = app_times.get(app, 0) + elapsed_time
                write_to_file(app, app_times[app])  # Write the total time to file
                continue
            else:
                # If the app is still running, calculate the current elapsed time
                app_times[app] = time.time() - start_times[app]
        
        time.sleep(5)  # Check every 5 seconds

def handle_client(client_socket):
    """Handle the frontend request and send the data."""
    while True:
        data = client_socket.recv(1024).decode('utf-8')  # Receive request from frontend
        if data == 'GET_DATA':
            # Send the current app times back to frontend
            client_socket.send(str(app_times).encode('utf-8'))
        else:
            break

def start_server():
    """Start a socket server to communicate with the frontend."""
    server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server.bind(('localhost', 9449))  # Localhost and port 9449 (Fix port)
    server.listen(5)
    
    print("Backend server started and waiting for frontend to connect...")
    
    while True:
        client_socket, addr = server.accept()
        print(f"Connection from {addr}")
        client_handler = threading.Thread(target=handle_client, args=(client_socket,))
        client_handler.start()

if __name__ == "__main__":
    # Start the app tracking thread and server thread
    track_app_times_thread = threading.Thread(target=track_app_times)
    track_app_times_thread.start()

    start_server()  # Start the server to handle frontend requests
