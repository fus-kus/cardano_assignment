
# Backend variables
BACKEND_DIR=BE
POETRY=poetry

# Frontend variables
FRONTEND_DIR=FE
NPM=npm

# Install dependencies for both backend and frontend
.PHONY: install
install: install-backend install-frontend

.PHONY: install-backend
install-backend:
	cd $(BACKEND_DIR) && $(POETRY) install

.PHONY: install-frontend
install-frontend:
	cd $(FRONTEND_DIR) && $(NPM) install

.PHONY: run-backend
run-backend:
	cd $(BACKEND_DIR) && $(POETRY) run python app/run.py

.PHONY: run-frontend
run-frontend:
	cd $(FRONTEND_DIR) && $(NPM) run dev

# Clean up
.PHONY: clean
clean: clean-backend clean-frontend

.PHONY: clean-backend
clean-backend:
	cd $(BACKEND_DIR) && $(POETRY) env remove --all

.PHONY: clean-frontend
clean-frontend:
	rm -rf $(FRONTEND_DIR)/node_modules
