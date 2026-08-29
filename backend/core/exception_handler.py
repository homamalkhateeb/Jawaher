from rest_framework.views import exception_handler


def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)

    if response is None:
        return None

    if isinstance(response.data, dict):
        errors = response.data
    else:
        errors = {
            'detail': response.data
        }

    message = errors.get(
        'detail',
        'Request failed'
    )

    if isinstance(message, (dict, list)):
        message = 'Request failed'

    response.data = {
        'success': False,
        'message': message,
        'errors': errors,
    }

    return response