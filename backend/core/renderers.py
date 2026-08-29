from rest_framework.renderers import JSONRenderer


class CustomJSONRenderer(JSONRenderer):

    def render(self, data, accepted_media_type=None, renderer_context=None):
        response = renderer_context.get('response')

        # لا نغلف أخطاء الـAPI هنا.
        # الـException Handler هو المسؤول عنها.
        if response is not None and response.status_code >= 400:
            return super().render(
                data,
                accepted_media_type,
                renderer_context
            )

        # إذا كانت الاستجابة مغلفة مسبقًا
        # فلا نغلفها مرة ثانية.
        if isinstance(data, dict) and (
            'success' in data
            and 'message' in data
            and 'data' in data
        ):
            return super().render(
                data,
                accepted_media_type,
                renderer_context
            )

        # Pagination
        if isinstance(data, dict) and 'results' in data:
            response_data = {
                'success': True,
                'message': 'Data retrieved successfully',
                'data': data,
            }

        # Response عادي
        else:
            response_data = {
                'success': True,
                'message': 'Request successful',
                'data': data,
            }

        return super().render(
            response_data,
            accepted_media_type,
            renderer_context
        )