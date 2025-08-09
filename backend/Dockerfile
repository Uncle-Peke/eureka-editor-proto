# syntax=docker/dockerfile:1.7

FROM --platform=$BUILDPLATFORM golang:1.22 AS builder
WORKDIR /app

# Support multi-arch builds
ARG TARGETOS
ARG TARGETARCH

# Leverage caching for dependencies
COPY go.mod go.sum ./
RUN --mount=type=cache,target=/go/pkg/mod go mod download

# Copy application source
COPY . .

# Build a small, static, reproducible binary
RUN --mount=type=cache,target=/root/.cache/go-build \
    CGO_ENABLED=0 \
    GOOS=$TARGETOS \
    GOARCH=$TARGETARCH \
    go build -trimpath -ldflags="-s -w -buildid=" -buildvcs=false -o /out/server .

FROM gcr.io/distroless/static-debian12:nonroot
WORKDIR /app

# Run Gin in release mode
ENV GIN_MODE=release

# Copy the built binary from builder stage
COPY --from=builder /out/server /app/server

# Document the port and run as non-root (inherited from :nonroot)
EXPOSE 8080
ENTRYPOINT ["/app/server"]


