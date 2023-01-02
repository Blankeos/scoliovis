# ScolioVis `/src`

The `src` directory contains code to build the software. Our code is split into 3 different repositories: `scoliovis-web`, `scoliovis-api`, and `scoliovis-training`.

## Source Repositories

1. `🔏` [scoliovis-web](https://github.com/Blankeos/scoliovis-web) - Front End Repo
2. `⚡` [scoliovis-api](https://github.com/Blankeos/scoliovis-api) - Back End Repo
3. `⛹️‍♂️` [scoliovis-training](https://github.com/Blankeos/scoliovis-training) - Model Training Repository

## Setup Instructions

#### a. Run the project on your local machine.

1. Make sure your local machine has installed the following requirements:

   - [Node.js® v18.12.1 or higher](https://nodejs.org/en/)
   - [PNPM](https://pnpm.io/installation) `npm install --global pnpm`
   - [Python 3.9.6 or higher](https://www.python.org/downloads/)

2. Setup the frontend: `scoliovis-web`

   ```sh
   # 1. Clone repo
   D:> git clone https://github.com/blankeos/scoliovis-web.git
   D:> cd scoliovis-web

   # 2. Install dependencies
   D:\scoliovis-web> pnpm install

   # 3. Run the server on http://localhost:3000
   D:\scoliovis-web> pnpm dev
   ```

3. Setup the backend `scoliovis-api`

   ```sh
   # 1. Clone repo
   D:> git clone https://github.com/blankeos/scoliovis-api.git
   D:> cd scoliovis-api

   # 2. Create a virtual environment
   D:\scoliovis-web> python -m venv venv

   # 3. Activate virtual environment
   # - If you're on Windows Command Prompt
   D:\scoliovis-web>venv\Scripts\activate
   (venv) D:\scoliovis-web> # your cursor should look like this

   # - If you're on Mac or Git Bash
   /d/scoliovis-web> source venv/Scripts/activate
   (venv) /d/scoliovis-web> # your cursor should look like this

   # 5. Install dependencies
   (venv) D:\scoliovis-web> pip install -r requirements.txt

   # 6. Run the server on http://localhost:8000
   (venv) D:\scoliovis-web> uvicorn main:app
   ```

#### b. Reproduce the project from scratch.
