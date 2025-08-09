FROM golang:1.22-alpine AS build
WORKDIR /src
RUN apk add --no-cache git
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 go build -o /out/migrate ./main.go

FROM alpine:3.20
WORKDIR /app
COPY --from=build /out/migrate /usr/local/bin/migrate
COPY migrations ./migrations
ENV DATABASE_URL=""
ENTRYPOINT ["/usr/local/bin/migrate"]