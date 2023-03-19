.PHONY: freeze


freeze:
	@echo "Freezing requirements..."
	@pip freeze > requirements.txt
	@echo "Done."

serve:
	@echo "Starting server..."
	@flask --debug run