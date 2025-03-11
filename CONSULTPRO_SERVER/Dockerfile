FROM openjdk:17-jdk-alpine
WORKDIR /app
COPY target/api-0.0.1-SNAPSHOT.jar app.jar
ENV MYSQL_HOST=mysql
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]