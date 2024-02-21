import { Box, Button, Icon } from '@mui/material';
import React from 'react';
export function MuiMultiSelectInput({
  chatController,
  actionRequest
}) {
  const chatCtl = chatController;
  const [values, setValues] = React.useState([]);
  const handleSelect = React.useCallback(value => {
    if (!values.includes(value)) {
      setValues([...values, value]);
    } else {
      setValues(values.filter(v => v !== value));
    }
  }, [values]);
  const setResponse = React.useCallback(() => {
    const options = actionRequest.options.filter(o => values.includes(o.value));
    const res = {
      type: 'multi-select',
      value: options.map(o => o.text).toString(),
      options
    };
    chatCtl.setActionResponse(actionRequest, res);
    setValues([]);
  }, [actionRequest, chatCtl, values]);
  const sendButtonText = actionRequest.sendButtonText ? actionRequest.sendButtonText : 'Send';
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
    onClick: e => handleSelect(e.currentTarget.value),
    variant: !values.includes(o.value) ? 'outlined' : 'contained',
    color: "primary"
  }, o.text)), /*#__PURE__*/React.createElement(Button, {
    type: "button",
    onClick: setResponse,
    disabled: values.length === 0,
    variant: "contained",
    color: "primary",
    startIcon: /*#__PURE__*/React.createElement(Icon, null, "send")
  }, sendButtonText));
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tdWkvTXVpTXVsdGlTZWxlY3RJbnB1dC50c3giXSwibmFtZXMiOlsiQm94IiwiQnV0dG9uIiwiSWNvbiIsIlJlYWN0IiwiTXVpTXVsdGlTZWxlY3RJbnB1dCIsImNoYXRDb250cm9sbGVyIiwiYWN0aW9uUmVxdWVzdCIsImNoYXRDdGwiLCJ2YWx1ZXMiLCJzZXRWYWx1ZXMiLCJ1c2VTdGF0ZSIsImhhbmRsZVNlbGVjdCIsInVzZUNhbGxiYWNrIiwidmFsdWUiLCJpbmNsdWRlcyIsImZpbHRlciIsInYiLCJzZXRSZXNwb25zZSIsIm9wdGlvbnMiLCJvIiwicmVzIiwidHlwZSIsIm1hcCIsInRleHQiLCJ0b1N0cmluZyIsInNldEFjdGlvblJlc3BvbnNlIiwic2VuZEJ1dHRvblRleHQiLCJmbGV4IiwiZGlzcGxheSIsImZsZXhEaXJlY3Rpb24iLCJtYXhXaWR0aCIsIm10IiwiaW5kZXhPZiIsImUiLCJjdXJyZW50VGFyZ2V0IiwibGVuZ3RoIl0sIm1hcHBpbmdzIjoiQUFBQSxTQUFTQSxHQUFULEVBQWNDLE1BQWQsRUFBc0JDLElBQXRCLFFBQWtDLGVBQWxDO0FBQ0EsT0FBT0MsS0FBUCxNQUFrQixPQUFsQjtBQVFBLE9BQU8sU0FBU0MsbUJBQVQsQ0FBNkI7QUFDbENDLEVBQUFBLGNBRGtDO0FBRWxDQyxFQUFBQTtBQUZrQyxDQUE3QixFQU1nQjtBQUNyQixRQUFNQyxPQUFPLEdBQUdGLGNBQWhCO0FBQ0EsUUFBTSxDQUFDRyxNQUFELEVBQVNDLFNBQVQsSUFBc0JOLEtBQUssQ0FBQ08sUUFBTixDQUF5QixFQUF6QixDQUE1QjtBQUVBLFFBQU1DLFlBQVksR0FBR1IsS0FBSyxDQUFDUyxXQUFOLENBQ2xCQyxLQUFELElBQXlCO0FBQ3ZCLFFBQUksQ0FBQ0wsTUFBTSxDQUFDTSxRQUFQLENBQWdCRCxLQUFoQixDQUFMLEVBQTZCO0FBQzNCSixNQUFBQSxTQUFTLENBQUMsQ0FBQyxHQUFHRCxNQUFKLEVBQVlLLEtBQVosQ0FBRCxDQUFUO0FBQ0QsS0FGRCxNQUVPO0FBQ0xKLE1BQUFBLFNBQVMsQ0FBQ0QsTUFBTSxDQUFDTyxNQUFQLENBQWVDLENBQUQsSUFBT0EsQ0FBQyxLQUFLSCxLQUEzQixDQUFELENBQVQ7QUFDRDtBQUNGLEdBUGtCLEVBUW5CLENBQUNMLE1BQUQsQ0FSbUIsQ0FBckI7QUFXQSxRQUFNUyxXQUFXLEdBQUdkLEtBQUssQ0FBQ1MsV0FBTixDQUFrQixNQUFZO0FBQ2hELFVBQU1NLE9BQU8sR0FBR1osYUFBYSxDQUFDWSxPQUFkLENBQXNCSCxNQUF0QixDQUE4QkksQ0FBRCxJQUMzQ1gsTUFBTSxDQUFDTSxRQUFQLENBQWdCSyxDQUFDLENBQUNOLEtBQWxCLENBRGMsQ0FBaEI7QUFJQSxVQUFNTyxHQUE4QixHQUFHO0FBQ3JDQyxNQUFBQSxJQUFJLEVBQUUsY0FEK0I7QUFFckNSLE1BQUFBLEtBQUssRUFBRUssT0FBTyxDQUFDSSxHQUFSLENBQWFILENBQUQsSUFBT0EsQ0FBQyxDQUFDSSxJQUFyQixFQUEyQkMsUUFBM0IsRUFGOEI7QUFHckNOLE1BQUFBO0FBSHFDLEtBQXZDO0FBS0FYLElBQUFBLE9BQU8sQ0FBQ2tCLGlCQUFSLENBQTBCbkIsYUFBMUIsRUFBeUNjLEdBQXpDO0FBQ0FYLElBQUFBLFNBQVMsQ0FBQyxFQUFELENBQVQ7QUFDRCxHQVptQixFQVlqQixDQUFDSCxhQUFELEVBQWdCQyxPQUFoQixFQUF5QkMsTUFBekIsQ0FaaUIsQ0FBcEI7QUFjQSxRQUFNa0IsY0FBYyxHQUFHcEIsYUFBYSxDQUFDb0IsY0FBZCxHQUNuQnBCLGFBQWEsQ0FBQ29CLGNBREssR0FFbkIsTUFGSjtBQUlBLHNCQUNFLG9CQUFDLEdBQUQ7QUFDRSxJQUFBLEVBQUUsRUFBRTtBQUNGQyxNQUFBQSxJQUFJLEVBQUUsVUFESjtBQUVGQyxNQUFBQSxPQUFPLEVBQUUsTUFGUDtBQUdGQyxNQUFBQSxhQUFhLEVBQUUsUUFIYjtBQUlGLGVBQVM7QUFDUEYsUUFBQUEsSUFBSSxFQUFFLFVBREM7QUFFUEcsUUFBQUEsUUFBUSxFQUFFO0FBRkgsT0FKUDtBQVFGLG1CQUFhO0FBQ1hDLFFBQUFBLEVBQUUsRUFBRTtBQURPO0FBUlg7QUFETixLQWNHekIsYUFBYSxDQUFDWSxPQUFkLENBQXNCSSxHQUF0QixDQUEyQkgsQ0FBRCxpQkFDekIsb0JBQUMsTUFBRDtBQUNFLElBQUEsR0FBRyxFQUFFYixhQUFhLENBQUNZLE9BQWQsQ0FBc0JjLE9BQXRCLENBQThCYixDQUE5QixDQURQO0FBRUUsSUFBQSxJQUFJLEVBQUMsUUFGUDtBQUdFLElBQUEsS0FBSyxFQUFFQSxDQUFDLENBQUNOLEtBSFg7QUFJRSxJQUFBLE9BQU8sRUFBR29CLENBQUQsSUFBYXRCLFlBQVksQ0FBQ3NCLENBQUMsQ0FBQ0MsYUFBRixDQUFnQnJCLEtBQWpCLENBSnBDO0FBS0UsSUFBQSxPQUFPLEVBQUUsQ0FBQ0wsTUFBTSxDQUFDTSxRQUFQLENBQWdCSyxDQUFDLENBQUNOLEtBQWxCLENBQUQsR0FBNEIsVUFBNUIsR0FBeUMsV0FMcEQ7QUFNRSxJQUFBLEtBQUssRUFBQztBQU5SLEtBUUdNLENBQUMsQ0FBQ0ksSUFSTCxDQURELENBZEgsZUEwQkUsb0JBQUMsTUFBRDtBQUNFLElBQUEsSUFBSSxFQUFDLFFBRFA7QUFFRSxJQUFBLE9BQU8sRUFBRU4sV0FGWDtBQUdFLElBQUEsUUFBUSxFQUFFVCxNQUFNLENBQUMyQixNQUFQLEtBQWtCLENBSDlCO0FBSUUsSUFBQSxPQUFPLEVBQUMsV0FKVjtBQUtFLElBQUEsS0FBSyxFQUFDLFNBTFI7QUFNRSxJQUFBLFNBQVMsZUFBRSxvQkFBQyxJQUFEO0FBTmIsS0FRR1QsY0FSSCxDQTFCRixDQURGO0FBdUNEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQm94LCBCdXR0b24sIEljb24gfSBmcm9tICdAbXVpL21hdGVyaWFsJztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IENoYXRDb250cm9sbGVyIH0gZnJvbSAnLi4vY2hhdC1jb250cm9sbGVyJztcbmltcG9ydCB7XG4gIE11bHRpU2VsZWN0QWN0aW9uUmVxdWVzdCxcbiAgTXVsdGlTZWxlY3RBY3Rpb25SZXNwb25zZSxcbn0gZnJvbSAnLi4vY2hhdC10eXBlcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBNdWlNdWx0aVNlbGVjdElucHV0KHtcbiAgY2hhdENvbnRyb2xsZXIsXG4gIGFjdGlvblJlcXVlc3QsXG59OiB7XG4gIGNoYXRDb250cm9sbGVyOiBDaGF0Q29udHJvbGxlcjtcbiAgYWN0aW9uUmVxdWVzdDogTXVsdGlTZWxlY3RBY3Rpb25SZXF1ZXN0O1xufSk6IFJlYWN0LlJlYWN0RWxlbWVudCB7XG4gIGNvbnN0IGNoYXRDdGwgPSBjaGF0Q29udHJvbGxlcjtcbiAgY29uc3QgW3ZhbHVlcywgc2V0VmFsdWVzXSA9IFJlYWN0LnVzZVN0YXRlPHN0cmluZ1tdPihbXSk7XG5cbiAgY29uc3QgaGFuZGxlU2VsZWN0ID0gUmVhY3QudXNlQ2FsbGJhY2soXG4gICAgKHZhbHVlOiBzdHJpbmcpOiB2b2lkID0+IHtcbiAgICAgIGlmICghdmFsdWVzLmluY2x1ZGVzKHZhbHVlKSkge1xuICAgICAgICBzZXRWYWx1ZXMoWy4uLnZhbHVlcywgdmFsdWVdKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNldFZhbHVlcyh2YWx1ZXMuZmlsdGVyKCh2KSA9PiB2ICE9PSB2YWx1ZSkpO1xuICAgICAgfVxuICAgIH0sXG4gICAgW3ZhbHVlc10sXG4gICk7XG5cbiAgY29uc3Qgc2V0UmVzcG9uc2UgPSBSZWFjdC51c2VDYWxsYmFjaygoKTogdm9pZCA9PiB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IGFjdGlvblJlcXVlc3Qub3B0aW9ucy5maWx0ZXIoKG8pID0+XG4gICAgICB2YWx1ZXMuaW5jbHVkZXMoby52YWx1ZSksXG4gICAgKTtcblxuICAgIGNvbnN0IHJlczogTXVsdGlTZWxlY3RBY3Rpb25SZXNwb25zZSA9IHtcbiAgICAgIHR5cGU6ICdtdWx0aS1zZWxlY3QnLFxuICAgICAgdmFsdWU6IG9wdGlvbnMubWFwKChvKSA9PiBvLnRleHQpLnRvU3RyaW5nKCksXG4gICAgICBvcHRpb25zLFxuICAgIH07XG4gICAgY2hhdEN0bC5zZXRBY3Rpb25SZXNwb25zZShhY3Rpb25SZXF1ZXN0LCByZXMpO1xuICAgIHNldFZhbHVlcyhbXSk7XG4gIH0sIFthY3Rpb25SZXF1ZXN0LCBjaGF0Q3RsLCB2YWx1ZXNdKTtcblxuICBjb25zdCBzZW5kQnV0dG9uVGV4dCA9IGFjdGlvblJlcXVlc3Quc2VuZEJ1dHRvblRleHRcbiAgICA/IGFjdGlvblJlcXVlc3Quc2VuZEJ1dHRvblRleHRcbiAgICA6ICdTZW5kJztcblxuICByZXR1cm4gKFxuICAgIDxCb3hcbiAgICAgIHN4PXt7XG4gICAgICAgIGZsZXg6ICcxIDEgYXV0bycsXG4gICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgZmxleERpcmVjdGlvbjogJ2NvbHVtbicsXG4gICAgICAgICcmID4gKic6IHtcbiAgICAgICAgICBmbGV4OiAnMCAwIGF1dG8nLFxuICAgICAgICAgIG1heFdpZHRoOiAnMTAwJScsXG4gICAgICAgIH0sXG4gICAgICAgICcmID4gKiArIConOiB7XG4gICAgICAgICAgbXQ6IDEsXG4gICAgICAgIH0sXG4gICAgICB9fVxuICAgID5cbiAgICAgIHthY3Rpb25SZXF1ZXN0Lm9wdGlvbnMubWFwKChvKSA9PiAoXG4gICAgICAgIDxCdXR0b25cbiAgICAgICAgICBrZXk9e2FjdGlvblJlcXVlc3Qub3B0aW9ucy5pbmRleE9mKG8pfVxuICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgIHZhbHVlPXtvLnZhbHVlfVxuICAgICAgICAgIG9uQ2xpY2s9eyhlKTogdm9pZCA9PiBoYW5kbGVTZWxlY3QoZS5jdXJyZW50VGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICB2YXJpYW50PXshdmFsdWVzLmluY2x1ZGVzKG8udmFsdWUpID8gJ291dGxpbmVkJyA6ICdjb250YWluZWQnfVxuICAgICAgICAgIGNvbG9yPVwicHJpbWFyeVwiXG4gICAgICAgID5cbiAgICAgICAgICB7by50ZXh0fVxuICAgICAgICA8L0J1dHRvbj5cbiAgICAgICkpfVxuICAgICAgPEJ1dHRvblxuICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgb25DbGljaz17c2V0UmVzcG9uc2V9XG4gICAgICAgIGRpc2FibGVkPXt2YWx1ZXMubGVuZ3RoID09PSAwfVxuICAgICAgICB2YXJpYW50PVwiY29udGFpbmVkXCJcbiAgICAgICAgY29sb3I9XCJwcmltYXJ5XCJcbiAgICAgICAgc3RhcnRJY29uPXs8SWNvbj5zZW5kPC9JY29uPn1cbiAgICAgID5cbiAgICAgICAge3NlbmRCdXR0b25UZXh0fVxuICAgICAgPC9CdXR0b24+XG4gICAgPC9Cb3g+XG4gICk7XG59XG4iXX0=