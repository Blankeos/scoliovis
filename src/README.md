# ScolioVis `/src`

The `src` directory contains code to build the software. Here, you can find the `frontend` and `backend` folders.

## :toolbox: Setup Instructions (For Evaluators)

> For **Evaluators** of this project that only need to run the app, refer to this section.

1. Make sure your local machine has installed the following requirements:

   - [Git](https://git-scm.com/downloads)
   - [Node.js® v18.12.1 or higher](https://nodejs.org/en/)
   - [PNPM](https://pnpm.io/installation) `npm install --global pnpm`
   - [Python 3.9.6 or higher](https://www.python.org/downloads/)

2. Clone this repository

   ```sh
   D:> git clone https://github.com/blankeos/scoliovis.git
   D:> cd scoliovis\src
   ```

3. Setup the frontend: `🎨 scoliovis-web`

   ```sh
   # 1. Go to frontend
   D:\scoliovis\src> cd frontend

   # 2. Install dependencies
   D:\scoliovis\src\frontend> pnpm install

   # 3. Run the server on http://localhost:3000
   D:\scoliovis\src\frontend> pnpm build
   D:\scoliovis\src\frontend> pnpm start
   ```

4. Setup the backend `⚡ scoliovis-api`

   ```sh
   # 1. Go to backend
   D:\scoliovis\src> cd backend

   # 2. Create a virtual environment
   D:\scoliovis\src\backend> python -m venv venv

   # 3. Activate virtual environment
   # - If you're on Windows Command Prompt
   D:\scoliovis\src\backend>venv\Scripts\activate
   (venv) D:\scoliovis\src\backend> # your cursor should look like this

   # - If you're on Mac or Git Bash
   /d/scoliovis/src/backend> source venv/Scripts/activate
   (venv) /d/scoliovis/src/backend> # your cursor should look like this

   # 4. Install dependencies
   (venv) D:\scoliovis\src\backend> pip install -r requirements.txt

   # 5. Download keypointsrcnn_weights and put inside scoliovis\src\backend\models:
   https://github.com/Blankeos/scoliovis-training/releases

   # 6. Run the server on http://localhost:8000
   (venv) D:\scoliovis-api> uvicorn main:app
   ```

## :toolbox: Setup Instructions (For Researchers)

> For **Researchers** interested in improving upon or recreating our project, we recommend reading this section to help you train the model from the beginning, the same way we did.

1. Follow our instructions on training at [`🏋️‍♂️ scoliovis-training`](https://github.com/Blankeos/scoliovis-training)

2. Save and rename the model to `keypointsrcnn_weights.pt`.

3. Follow the [setup instructions for evaluators](#toolbox-setup-instructions-for-evaluators).

4. Before running the **scoliovis-api**, move `keypointsrcnn_weights.pt`to the`scoliovis-api/models/` directory.

## ⚙ Source Repositories

Aside from this `scoliovis` monorepo, we also split our code into 3 different repositories: `scoliovis-web`, `scoliovis-api`, and `scoliovis-training`. You can optionally play around with these if you'd like:

1. `🎨` [scoliovis-web](https://github.com/Blankeos/scoliovis-web) - Front End
2. `⚡` [scoliovis-api](https://github.com/Blankeos/scoliovis-api) - Back End Repository
3. `🏋️‍♂️` [scoliovis-training](https://github.com/Blankeos/scoliovis-training) - Model Training Repository
