from flask import Blueprint, request, jsonify
from lexer.lexer import calculate_expression
# Define un solo Blueprint con el prefijo de URL correcto.

bp = Blueprint('calc', __name__, url_prefix='/calculate')

# Define una única función de vista para calcular la expresión.
@bp.route('/', methods=['POST'])
def calculate():
    # Esta es una solicitud preflight OPTIONS, simplemente responde con los encabezados CORS adecuados
    data = request.json
    expression = data.get('expression', '')

    try:
        # Llama a calculate_expression para obtener el resultado de la expresión.
        result = calculate_expression(expression)
        return jsonify({'result': result}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400