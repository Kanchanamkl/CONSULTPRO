# Use an official OpenJDK runtime as a parent image
FROM openjdk:17-jdk-slim

# Set the working directory in the container
WORKDIR /app

# Copy the built JAR file into the container
COPY target/*.jar app.jar

# Expose the backend port
EXPOSE 8081

# Run the JAR file
CMD ["java", "-jar", "app.jar"]
