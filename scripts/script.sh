#!/bin/bash
check_echo(){
    brew update
}
<<<<<<< HEAD

initialize_docker() {
    if is_docker_installed; then
        echo "Docker is not installed. Installing Docker..."

        # Add your installation commands here
        sudo apt-get update
        sudo apt-get install -y apt-transport-https ca-certificates curl software-properties-common
        curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
        sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
        sudo apt-get update
        sudo apt-get install -y docker-ce

        # Verify the installation
        echo "Docker has been installed successfully."
        docker --version
        
    else
        echo "Docker is already installed hence skipping the installation."
        
    fi
}

# Function to check already logged in to Docker and then if loggd in return the username
is_logged_in() {
    if is_docker_installed; then
        echo "Docker is not installed. Please install Docker first."
        exit 1
    fi

    if docker info | grep -q "Username"; then
        echo "Already logged in to Docker."
        echo "Username: $(docker info | grep Username | awk '{print $2}')"
        return 1
    else
        echo "Not logged in to Docker."
        return 0
    fi
}


# Functions to login to Docker, username and password will be taken as arguments
login_to_docker() {
    if is_docker_installed; then
        echo "Docker is not installed. Please install Docker first."
        exit 1
    fi

    if [ -z "$1" ] || [ -z "$2" ]; then
        echo "Please provide username and password to login to Docker."
        exit 1
    fi

    echo "Logging in to Docker..."
    echo "$2" | docker login -u "$1" --password-stdin
    echo "Logged in to Docker successfully."
}

# Function to logout from Docker
logout_from_docker() {
    if is_docker_installed; then
        echo "Docker is not installed. Please install Docker first."
        exit 1
    fi

    if is_logged_in; then
        echo "Logging out from Docker..."
        docker logout
        echo "Logged out from Docker successfully."
    else
        echo "Not logged in to Docker."
    fi
}

# Function to run a docker container pulling the image with the dockerhub username and image name
run_docker_container() {
    if is_docker_installed; then
        echo "Docker is not installed. Please install Docker first."
        exit 1
    fi

    if is_logged_in; then
        echo "Please login to Docker first."
        exit 1
    fi

    if [ -z "$1" ] || [ -z "$2" ]; then
        echo "Please provide DockerHub username and image name."
        exit 1
    fi

    echo "Pulling Docker image..."
    docker pull "$1/$2"

    echo "Running Docker container..."
    docker run -d "$1/$2"
    echo "Docker container has been started successfully."

    echo "List of running containers:"
    docker ps
}

# Function to stop a running docker container
stop_docker_container() {
    if is_docker_installed; then
        echo "Docker is not installed. Please install Docker first."
        exit 1
    fi

    if is_logged_in; then
        echo "Please login to Docker first."
        exit 1
    fi

    if [ -z "$1" ]; then
        echo "Please provide the container ID to stop the container."
        exit 1
    fi

    echo "Stopping Docker container..."
    docker stop "$1"
    echo "Docker container has been stopped successfully."

    echo "List of running containers:"
    docker ps
}

# Function to remove a docker container
remove_docker_container() {
    if is_docker_installed; then
        echo "Docker is not installed. Please install Docker first."
        exit 1
    fi

    if is_logged_in; then
        echo "Please login to Docker first."
        exit 1
    fi

    if [ -z "$1" ]; then
        echo "Please provide the container ID to remove the container."
        exit 1
    fi

    echo "Removing Docker container..."
    docker rm "$1"
    echo "Docker container has been removed successfully."

    echo "List of running containers:"
    docker ps
}

# Function to list all the docker containers
list_docker_containers() {
    if is_docker_installed; then
        echo "Docker is not installed. Please install Docker first."
        exit 1
    fi

    if is_logged_in; then
        echo "Please login to Docker first."
        exit 1
    fi

    echo "List of all Docker containers:"
    docker ps -a
}

# Function to list all the docker images
list_docker_images() {
    if is_docker_installed; then
        echo "Docker is not installed. Please install Docker first."
        exit 1
    fi

    if is_logged_in; then
        echo "Please login to Docker first."
        exit 1
    fi

    echo "List of all Docker images:"
    docker images
}

# Function to remove a docker image
remove_docker_image() {
    if is_docker_installed; then
        echo "Docker is not installed. Please install Docker first."
        exit 1
    fi

    if is_logged_in; then
        echo "Please login to Docker first."
        exit 1
    fi

    if [ -z "$1" ]; then
        echo "Please provide the image ID to remove the image."
        exit 1
    fi

    echo "Removing Docker image..."
    docker rmi "$1"
    echo "Docker image has been removed successfully."

    echo "List of all Docker images:"
    docker images
}

# Function to execute a command inside a running docker container
execute_command_in_docker_container() {
    if is_docker_installed; then
        echo "Docker is not installed. Please install Docker first."
        exit 1
    fi

    if is_logged_in; then
        echo "Please login to Docker first."
        exit 1
    fi

    if [ -z "$1" ] || [ -z "$2" ]; then
        echo "Please provide the container ID and the command to execute."
        exit 1
    fi

    echo "Executing command inside Docker container..."
    docker exec -it "$1" "$2"
}


# Check if a function name is provided as an argument
if [ -z "$1" ]; then
    echo "Please provide a function name."
    exit 1
fi

# Run the specified function
"$@"
=======
check_echo
>>>>>>> 51799e5 (added listener, added bullq)
