# Stage 1: Build the React frontend
FROM node:18-alpine AS frontend-build
WORKDIR /frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Stage 2: Build the Spring Boot backend
FROM maven:3.9.6-eclipse-temurin-17 AS backend-build
WORKDIR /app

# Copy pom.xml and download dependencies
COPY backend/pom.xml .
RUN mvn dependency:go-offline

# Copy the rest of the backend source
COPY backend/src ./src

# Copy frontend build output to Spring Boot static resources
COPY --from=frontend-build /frontend/dist ./src/main/resources/static/

# Build the jar
RUN mvn clean package -DskipTests

# Stage 3: Run the application
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=backend-build /app/target/*.jar app.jar

# Render usually sets the PORT environment variable
EXPOSE 10000

ENTRYPOINT ["java", "-jar", "app.jar"]
