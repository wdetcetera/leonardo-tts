import { Box, Button } from '@mui/material';
import React from 'react';
export function MuiSelectInput({
  chatController,
  actionRequest
}) {
  const chatCtl = chatController;
  const setResponse = React.useCallback(value => {
    const option = actionRequest.options.find(o => o.value === value);

    if (!option) {
      throw new Error(`Unknown value: ${value}`);
    }

    const res = {
      type: 'select',
      value: option.text,
      option
    };
    chatCtl.setActionResponse(actionRequest, res);
  }, [actionRequest, chatCtl]);
  return /*#__PURE__*/React.createElement(Box, {
    sx: {
      flex: '1 1 auto',
      display: 'flex',
      flexDirection: 'column',
      '& > *': {
        flex: '0 0 auto',
        maxWidth: '100%'
      },
      '& > * + *': {
        mt: 1
      }
    }
  }, actionRequest.options.map(o => /*#__PURE__*/React.createElement(Button, {
    key: actionRequest.options.indexOf(o),
    type: "button",
    value: o.value,
    onClick: e => setResponse(e.currentTarget.value),
    variant: "contained",
    color: "primary"
  }, o.text)));
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tdWkvTXVpU2VsZWN0SW5wdXQudHN4Il0sIm5hbWVzIjpbIkJveCIsIkJ1dHRvbiIsIlJlYWN0IiwiTXVpU2VsZWN0SW5wdXQiLCJjaGF0Q29udHJvbGxlciIsImFjdGlvblJlcXVlc3QiLCJjaGF0Q3RsIiwic2V0UmVzcG9uc2UiLCJ1c2VDYWxsYmFjayIsInZhbHVlIiwib3B0aW9uIiwib3B0aW9ucyIsImZpbmQiLCJvIiwiRXJyb3IiLCJyZXMiLCJ0eXBlIiwidGV4dCIsInNldEFjdGlvblJlc3BvbnNlIiwiZmxleCIsImRpc3BsYXkiLCJmbGV4RGlyZWN0aW9uIiwibWF4V2lkdGgiLCJtdCIsIm1hcCIsImluZGV4T2YiLCJlIiwiY3VycmVudFRhcmdldCJdLCJtYXBwaW5ncyI6IkFBQUEsU0FBU0EsR0FBVCxFQUFjQyxNQUFkLFFBQTRCLGVBQTVCO0FBQ0EsT0FBT0MsS0FBUCxNQUFrQixPQUFsQjtBQUtBLE9BQU8sU0FBU0MsY0FBVCxDQUF3QjtBQUM3QkMsRUFBQUEsY0FENkI7QUFFN0JDLEVBQUFBO0FBRjZCLENBQXhCLEVBTWdCO0FBQ3JCLFFBQU1DLE9BQU8sR0FBR0YsY0FBaEI7QUFFQSxRQUFNRyxXQUFXLEdBQUdMLEtBQUssQ0FBQ00sV0FBTixDQUNqQkMsS0FBRCxJQUF5QjtBQUN2QixVQUFNQyxNQUFNLEdBQUdMLGFBQWEsQ0FBQ00sT0FBZCxDQUFzQkMsSUFBdEIsQ0FBNEJDLENBQUQsSUFBT0EsQ0FBQyxDQUFDSixLQUFGLEtBQVlBLEtBQTlDLENBQWY7O0FBQ0EsUUFBSSxDQUFDQyxNQUFMLEVBQWE7QUFDWCxZQUFNLElBQUlJLEtBQUosQ0FBVyxrQkFBaUJMLEtBQU0sRUFBbEMsQ0FBTjtBQUNEOztBQUNELFVBQU1NLEdBQXlCLEdBQUc7QUFDaENDLE1BQUFBLElBQUksRUFBRSxRQUQwQjtBQUVoQ1AsTUFBQUEsS0FBSyxFQUFFQyxNQUFNLENBQUNPLElBRmtCO0FBR2hDUCxNQUFBQTtBQUhnQyxLQUFsQztBQUtBSixJQUFBQSxPQUFPLENBQUNZLGlCQUFSLENBQTBCYixhQUExQixFQUF5Q1UsR0FBekM7QUFDRCxHQVppQixFQWFsQixDQUFDVixhQUFELEVBQWdCQyxPQUFoQixDQWJrQixDQUFwQjtBQWdCQSxzQkFDRSxvQkFBQyxHQUFEO0FBQ0UsSUFBQSxFQUFFLEVBQUU7QUFDRmEsTUFBQUEsSUFBSSxFQUFFLFVBREo7QUFFRkMsTUFBQUEsT0FBTyxFQUFFLE1BRlA7QUFHRkMsTUFBQUEsYUFBYSxFQUFFLFFBSGI7QUFJRixlQUFTO0FBQ1BGLFFBQUFBLElBQUksRUFBRSxVQURDO0FBRVBHLFFBQUFBLFFBQVEsRUFBRTtBQUZILE9BSlA7QUFRRixtQkFBYTtBQUNYQyxRQUFBQSxFQUFFLEVBQUU7QUFETztBQVJYO0FBRE4sS0FjR2xCLGFBQWEsQ0FBQ00sT0FBZCxDQUFzQmEsR0FBdEIsQ0FBMkJYLENBQUQsaUJBQ3pCLG9CQUFDLE1BQUQ7QUFDRSxJQUFBLEdBQUcsRUFBRVIsYUFBYSxDQUFDTSxPQUFkLENBQXNCYyxPQUF0QixDQUE4QlosQ0FBOUIsQ0FEUDtBQUVFLElBQUEsSUFBSSxFQUFDLFFBRlA7QUFHRSxJQUFBLEtBQUssRUFBRUEsQ0FBQyxDQUFDSixLQUhYO0FBSUUsSUFBQSxPQUFPLEVBQUdpQixDQUFELElBQWFuQixXQUFXLENBQUNtQixDQUFDLENBQUNDLGFBQUYsQ0FBZ0JsQixLQUFqQixDQUpuQztBQUtFLElBQUEsT0FBTyxFQUFDLFdBTFY7QUFNRSxJQUFBLEtBQUssRUFBQztBQU5SLEtBUUdJLENBQUMsQ0FBQ0ksSUFSTCxDQURELENBZEgsQ0FERjtBQTZCRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJveCwgQnV0dG9uIH0gZnJvbSAnQG11aS9tYXRlcmlhbCc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgeyBDaGF0Q29udHJvbGxlciB9IGZyb20gJy4uL2NoYXQtY29udHJvbGxlcic7XG5pbXBvcnQgeyBTZWxlY3RBY3Rpb25SZXF1ZXN0LCBTZWxlY3RBY3Rpb25SZXNwb25zZSB9IGZyb20gJy4uL2NoYXQtdHlwZXMnO1xuXG5leHBvcnQgZnVuY3Rpb24gTXVpU2VsZWN0SW5wdXQoe1xuICBjaGF0Q29udHJvbGxlcixcbiAgYWN0aW9uUmVxdWVzdCxcbn06IHtcbiAgY2hhdENvbnRyb2xsZXI6IENoYXRDb250cm9sbGVyO1xuICBhY3Rpb25SZXF1ZXN0OiBTZWxlY3RBY3Rpb25SZXF1ZXN0O1xufSk6IFJlYWN0LlJlYWN0RWxlbWVudCB7XG4gIGNvbnN0IGNoYXRDdGwgPSBjaGF0Q29udHJvbGxlcjtcblxuICBjb25zdCBzZXRSZXNwb25zZSA9IFJlYWN0LnVzZUNhbGxiYWNrKFxuICAgICh2YWx1ZTogc3RyaW5nKTogdm9pZCA9PiB7XG4gICAgICBjb25zdCBvcHRpb24gPSBhY3Rpb25SZXF1ZXN0Lm9wdGlvbnMuZmluZCgobykgPT4gby52YWx1ZSA9PT0gdmFsdWUpO1xuICAgICAgaWYgKCFvcHRpb24pIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmtub3duIHZhbHVlOiAke3ZhbHVlfWApO1xuICAgICAgfVxuICAgICAgY29uc3QgcmVzOiBTZWxlY3RBY3Rpb25SZXNwb25zZSA9IHtcbiAgICAgICAgdHlwZTogJ3NlbGVjdCcsXG4gICAgICAgIHZhbHVlOiBvcHRpb24udGV4dCxcbiAgICAgICAgb3B0aW9uLFxuICAgICAgfTtcbiAgICAgIGNoYXRDdGwuc2V0QWN0aW9uUmVzcG9uc2UoYWN0aW9uUmVxdWVzdCwgcmVzKTtcbiAgICB9LFxuICAgIFthY3Rpb25SZXF1ZXN0LCBjaGF0Q3RsXSxcbiAgKTtcblxuICByZXR1cm4gKFxuICAgIDxCb3hcbiAgICAgIHN4PXt7XG4gICAgICAgIGZsZXg6ICcxIDEgYXV0bycsXG4gICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgZmxleERpcmVjdGlvbjogJ2NvbHVtbicsXG4gICAgICAgICcmID4gKic6IHtcbiAgICAgICAgICBmbGV4OiAnMCAwIGF1dG8nLFxuICAgICAgICAgIG1heFdpZHRoOiAnMTAwJScsXG4gICAgICAgIH0sXG4gICAgICAgICcmID4gKiArIConOiB7XG4gICAgICAgICAgbXQ6IDEsXG4gICAgICAgIH0sXG4gICAgICB9fVxuICAgID5cbiAgICAgIHthY3Rpb25SZXF1ZXN0Lm9wdGlvbnMubWFwKChvKSA9PiAoXG4gICAgICAgIDxCdXR0b25cbiAgICAgICAgICBrZXk9e2FjdGlvblJlcXVlc3Qub3B0aW9ucy5pbmRleE9mKG8pfVxuICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgIHZhbHVlPXtvLnZhbHVlfVxuICAgICAgICAgIG9uQ2xpY2s9eyhlKTogdm9pZCA9PiBzZXRSZXNwb25zZShlLmN1cnJlbnRUYXJnZXQudmFsdWUpfVxuICAgICAgICAgIHZhcmlhbnQ9XCJjb250YWluZWRcIlxuICAgICAgICAgIGNvbG9yPVwicHJpbWFyeVwiXG4gICAgICAgID5cbiAgICAgICAgICB7by50ZXh0fVxuICAgICAgICA8L0J1dHRvbj5cbiAgICAgICkpfVxuICAgIDwvQm94PlxuICApO1xufVxuIl19