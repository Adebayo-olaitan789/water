from flask import Flask, request, jsonify
import vertexai
from vertexai.generative_models import GenerativeModel, SafetySetting

app = Flask(__name__)

from flask_cors import CORS
CORS(app)


# Your FAQ data and chatbot logic goes here
# FAQ dataset
faq_data = {
    "hi": "Hello! How can I assist you today?",
    "hello": "Hi there! Feel free to ask me anything.",
    "hey": "Hey! How can I help you today?",
    "how are you": "I'm just a bot, but thanks for asking! How can I assist you?",
    "what's up": "Not much, just ready to answer your questions!",
    "What is an AWG?": "An Atmospheric Water Generator (AWG) is a device that extracts water from the humidity in the air. It works by cooling air to its dew point, causing water vapor to condense into liquid water, which is then collected and purified for use.",
    "Can the AWG be used in all climates?": "AWGs are most efficient in humid climates. In very dry or cold climates, performance may be reduced, so check the manufacturer’s specifications for suitability.",
    "What kind of water quality does the AWG produce?": "AWGs typically produce high-quality water that meets or exceeds drinking water standards. The water is filtered and purified during the condensation process.",
    "What are the initial costs and ongoing expenses for using an AWG?": "Initial costs include the purchase price and installation expenses, while ongoing costs involve electricity and maintenance. Costs vary based on the model and usage.",
    "What are the requirements for installing the AWG?": "Installation requires a stable surface, proper ventilation, and an appropriate power supply. Some models may need a water source connection. Refer to the user manual for detailed requirements.",
    "Can the AWG be installed outdoors?": "Some AWG models are suitable for outdoor installation, but others are designed for indoor use. Always consult the manufacturer's guidelines for specific recommendations.",
    "How do I set up the AWG for optimal performance?": "Set the AWG in a well-ventilated area, connect to the appropriate power supply, and follow the manufacturer's setup and calibration instructions to optimize performance.",
    "How long does it take for the AWG to produce water?": "The time to produce water varies by model and environmental conditions. AWGs typically start producing water within a short time, but the rate depends on humidity and temperature.",
    "Are there any energy-saving tips for using the AWG?": "Operate the AWG during cooler hours, keep it well-maintained, and ensure proper ventilation. Cleaning filters regularly helps optimize energy efficiency.",
    "What safety measures should be taken to ensure the water from the AWG is safe to drink?": "Regular maintenance, including filter cleaning, water testing, and following the manufacturer's sanitation guidelines, ensures water safety.",
    "How often should the AWG's water quality be tested?": "Water quality should be tested every 3-6 months or as recommended by the manufacturer to ensure safety and quality.",
    "How do I use the website to find information about the AWG?": "Navigate to the 'Products' or 'Support' section on the website. Use the search bar for specific information about your AWG model or explore the FAQ section.",
    "Where can I access the user manual on the website?": "User manuals can be found in the 'Support' or 'Downloads' section. Search for your specific AWG model to download the manual in PDF format.",
    "How can I track my AWG's warranty status through the website?": "Log in to the customer portal or support section on the website. Enter the serial number or purchase details to track the warranty status. Contact support if needed.",
    "What should I do if the machine doesn’t produce enough water?": "Check the AWG's settings, maintenance schedule, and environmental conditions. If the issue persists, refer to the troubleshooting guide in the manual or contact customer support.",
    "How do I troubleshoot if the AWG’s water output is not consistent?": "Ensure proper installation, check for ventilation and filter blockages, and refer to the troubleshooting guide. If the issue continues, contact customer support.",
    "How often should I perform maintenance on the AWG?": "Perform maintenance every 3-6 months or according to the manufacturer's guidelines. This includes cleaning filters and checking for wear and tear to maintain optimal performance.",
    "What common issues might arise with the AWG and how can they be fixed?": "Common issues include reduced water output and inconsistent performance. Refer to the troubleshooting guide or contact customer support for assistance.",
    "How do I clean the filters of the AWG?": "Remove and clean filters according to the user manual instructions. Typically, filters can be rinsed with water and left to dry before reinstalling. Regular cleaning ensures the AWG operates efficiently.",
    "What does the warranty for the AWG cover?": "The warranty typically covers defects in materials and workmanship and may include repair or replacement services. Check your warranty documentation for full details.",
    "How can I contact customer support for the AWG?": "Customer support can be reached through the website's support page, by phone, or via email. Contact details are available on the website and in the user manual.",
    "What should I do if the AWG breaks down during the warranty period?": "Contact customer support with your warranty information and serial number. The team will guide you through the repair or replacement process as per the warranty terms."
}
generation_config = {
    "max_output_tokens": 8192,
    "temperature": 1,
    "top_p": 0.95,
}

safety_settings = [
    SafetySetting(
        category=SafetySetting.HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold=SafetySetting.HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE
    ),
    SafetySetting(
        category=SafetySetting.HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold=SafetySetting.HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE
    ),
    SafetySetting(
        category=SafetySetting.HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold=SafetySetting.HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE
    ),
    SafetySetting(
        category=SafetySetting.HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold=SafetySetting.HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE
    ),
]

def generate_chatbot_response(user_prompt):
    vertexai.init(project="delta-button-434810-j5", location="us-central1")
    for question, answer in faq_data.items():
        if question.lower() in user_prompt.lower():
            return answer
    model = GenerativeModel("gemini-1.5-flash-001", system_instruction="You are an assistant chatbot...")
    responses = model.generate_content([user_prompt], generation_config=generation_config, safety_settings=safety_settings, stream=True)
    return responses[0].text if responses else "I couldn't find an answer to that."

@app.route('/chat', methods=['POST'])
def chat():
    user_input = request.json.get('input')  # Expecting an array of questions
    if isinstance(user_input, list):
        responses = [generate_chatbot_response(question) for question in user_input]
    else:
        responses = [generate_chatbot_response(user_input)]
    return jsonify({"response": responses})


if __name__ == '__main__':
    app.run(debug=True)
