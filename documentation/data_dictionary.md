# Data Dictionary for Movie App CineScope

This document outlines the data models used in the application, categorized into **Fact** and **Dimension** tables, with clear indication of field types, requirements, uniqueness, and references.

| Collection | Type | References                           |
| ---------- | ---- | ------------------------------------ |
| `User`     | Dim  | `Movie` (via `favorites`, `toWatch`) |
| `Review`   | Fact | `User`, `Movie`                      |
| `Movie`    | Dim  | —                                    |
| `Cast`     | Fact | `Movie`, `Actor`                     |
| `Actor`    | Dim  | —                                    |

---

## 📘 `Movie` (Dimension Table)

**Type**: Dimension  
**Embedding/Referencing**: Referenced by `User`, `Review`, `Cast`

| Field                    | Type             | Required | Unique | Description                                |
| ------------------------ | ---------------- | -------- | ------ | ------------------------------------------ |
| `ext_id`                 | number           | Yes      | Yes    | External (e.g., TMDB) ID                   |
| `title`                  | string           | Yes      | No     | Title of the movie                         |
| `releaseDate`            | date             | No       | No     | Release date                               |
| `runtime`                | number           | No       | No     | Runtime in minutes                         |
| `description`            | string           | No       | No     | Description or synopsis                    |
| `tagline`                | string           | No       | No     | Tagline                                    |
| `collection_poster_path` | string           | No       | No     | Path to collection poster image            |
| `poster_path`            | string           | No       | No     | Path to poster image                       |
| `popularity`             | number           | No       | No     | Popularity score                           |
| `vote_average`           | number           | No       | No     | Average user rating                        |
| `vote_count`             | number           | No       | No     | Number of user ratings                     |
| `genre`                  | array of strings | No       | No     | List of genre names                        |
| `keywords`               | array of strings | No       | No     | List of keywords associated with the movie |
| `createdAt`              | ISODate (auto)   | Auto     | No     | Timestamp of creation                      |
| `updatedAt`              | ISODate (auto)   | Auto     | No     | Timestamp of last update                   |

---

## 📘 `User` (Dimension Table)

**Type**: Dimension  
**Embedding/Referencing**: References `Movie` in `favorites` and `toWatch`

| Field       | Type              | Required | Unique | Description                               |
| ----------- | ----------------- | -------- | ------ | ----------------------------------------- |
| `username`  | string            | Yes      | Yes    | Unique username for the user              |
| `email`     | string            | Yes      | Yes    | User's email address                      |
| `password`  | string            | Yes      | No     | Hashed password                           |
| `favorites` | array of ObjectId | No       | No     | Favorite movies (ref: `Movie`)            |
| `toWatch`   | array of ObjectId | No       | No     | Movies user plans to watch (ref: `Movie`) |
| `createdAt` | ISODate (auto)    | Auto     | No     | Timestamp of user creation                |
| `updatedAt` | ISODate (auto)    | Auto     | No     | Timestamp of last update                  |

---

## 📘 `Cast` (Fact Table)

**Type**: Fact  
**Embedding/Referencing**:

- 🔗 References `Movie` and `Actor`
- 🔐 Index: Prevents duplicate movie-actor pairs

| Field       | Type           | Required | Unique | Description                           |
| ----------- | -------------- | -------- | ------ | ------------------------------------- |
| `movie`     | ObjectId (ref) | Yes      | No     | Associated movie (ref: `Movie`)       |
| `actor`     | ObjectId (ref) | Yes      | No     | Associated actor (ref: `Actor`)       |
| `character` | string         | Yes      | No     | Character name portrayed in the movie |
| `createdAt` | ISODate (auto) | Auto     | No     | Timestamp of creation                 |
| `updatedAt` | ISODate (auto) | Auto     | No     | Timestamp of last update              |

> 🔁 **Index Constraint**: `(movie, actor)` must be unique.

---

## 📘 `Actor` (Dimension Table)

**Type**: Dimension  
**Embedding/Referencing**: Referenced by `Cast`

| Field            | Type           | Required | Unique | Description                 |
| ---------------- | -------------- | -------- | ------ | --------------------------- |
| `ext_id`         | number         | Yes      | Yes    | External ID (e.g., TMDB)    |
| `name`           | string         | Yes      | No     | Actor's full name           |
| `birthday`       | date           | No       | No     | Date of birth               |
| `place_of_birth` | string         | No       | No     | Place of birth              |
| `nationality`    | string         | No       | No     | Nationality                 |
| `biography`      | string         | No       | No     | Biography or career summary |
| `profile_path`   | string         | No       | No     | Path to profile image       |
| `popularity`     | number         | No       | No     | Popularity score            |
| `createdAt`      | ISODate (auto) | Auto     | No     | Timestamp of creation       |
| `updatedAt`      | ISODate (auto) | Auto     | No     | Timestamp of last update    |

---

## 📘 `Review` (Fact Table)

**Type**: Fact  
**Embedding/Referencing**: References `Movie` and `User`

| Field       | Type           | Required | Unique | Description                   |
| ----------- | -------------- | -------- | ------ | ----------------------------- |
| `movie`     | ObjectId (ref) | Yes      | No     | Reviewed movie (ref: `Movie`) |
| `user`      | ObjectId (ref) | Yes      | No     | Reviewer (ref: `User`)        |
| `rating`    | number (1–10)  | Yes      | No     | Numerical rating (1 to 10)    |
| `review`    | string         | No       | No     | Optional written review       |
| `createdAt` | ISODate (auto) | Auto     | No     | Timestamp of review creation  |
| `updatedAt` | ISODate (auto) | Auto     | No     | Timestamp of last update      |

---
