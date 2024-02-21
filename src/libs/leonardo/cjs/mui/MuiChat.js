"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MuiChat = MuiChat;

var _material = require("@mui/material");

var _dayjs = _interopRequireDefault(require("dayjs"));

var _react = _interopRequireDefault(require("react"));

var _MuiAudioInput = require("./MuiAudioInput");

var _MuiFileInput = require("./MuiFileInput");

var _MuiMessage = require("./MuiMessage");

var _MuiMultiSelectInput = require("./MuiMultiSelectInput");

var _MuiSelectInput = require("./MuiSelectInput");

var _MuiTextInput = require("./MuiTextInput");

function MuiChat({
  chatController
}) {
  const chatCtl = chatController;

  const [messages, setMessages] = _react.default.useState(chatCtl.getMessages());

  const [actReq, setActReq] = _react.default.useState(chatCtl.getActionRequest());

  const msgRef = _react.default.useRef(null);

  const scroll = _react.default.useCallback(() => {
    if (msgRef.current) {
      msgRef.current.scrollTop = msgRef.current.scrollHeight; // msgRef.current.scrollIntoView(true);
    }
  }, [msgRef]);

  _react.default.useEffect(() => {
    function handleMassagesChanged() {
      setMessages([...chatCtl.getMessages()]);
      scroll();
    }

    function handleActionChanged() {
      setActReq(chatCtl.getActionRequest());
      scroll();
    }

    chatCtl.addOnMessagesChanged(handleMassagesChanged);
    chatCtl.addOnActionChanged(handleActionChanged);
  }, [chatCtl, scroll]);

  const CustomComponent = _react.default.useMemo(() => {
    if (!actReq || actReq.type !== 'custom') {
      return null;
    }

    return actReq.Component;
  }, [actReq]);

  const unknownMsg = {
    type: 'text',
    content: 'Unknown message.',
    self: false
  };
  let prevDate = (0, _dayjs.default)(0);
  let prevTime = (0, _dayjs.default)(0);
  return /*#__PURE__*/_react.default.createElement(_material.Box, {
    sx: {
      height: '100%',
      width: '100%',
      p: 1,
      bgcolor: 'background.default',
      display: 'flex',
      flexDirection: 'column',
      '& > *': {
        maxWidth: '100%'
      },
      '& > * + *': {
        mt: 1
      }
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Box, {
    sx: {
      flex: '1 1 0%',
      overflowY: 'auto',
      WebkitOverflowScrolling: 'touch',
      display: 'flex',
      flexDirection: 'column',
      '& > *': {
        maxWidth: '100%'
      }
    },
    ref: msgRef
  }, messages.map(msg => {
    let showDate = false;
    let showTime = !!chatCtl.getOption().showDateTime;

    if (!!chatCtl.getOption().showDateTime && !msg.deletedAt) {
      const current = (0, _dayjs.default)(msg.updatedAt ? msg.updatedAt : msg.createdAt);

      if (current.format('YYYYMMDD') !== prevDate.format('YYYYMMDD')) {
        showDate = true;
      }

      prevDate = current;

      if (current.diff(prevTime) < 60000) {
        showTime = false;
      } else {
        prevTime = current;
      }
    }

    if (msg.type === 'text' || msg.type === 'jsx') {
      return /*#__PURE__*/_react.default.createElement(_MuiMessage.MuiMessage, {
        key: messages.indexOf(msg),
        id: `cu-msg-${messages.indexOf(msg) + 1}`,
        message: msg,
        showDate: showDate,
        showTime: showTime
      });
    }

    return /*#__PURE__*/_react.default.createElement(_MuiMessage.MuiMessage, {
      key: messages.indexOf(msg),
      id: `cu-msg-${messages.indexOf(msg) + 1}`,
      message: unknownMsg,
      showDate: showDate,
      showTime: showTime
    });
  })), /*#__PURE__*/_react.default.createElement(_material.Box, {
    sx: {
      flex: '0 1 auto',
      display: 'flex',
      alignContent: 'flex-end',
      '& > *': {
        minWidth: 0
      }
    }
  }, actReq && actReq.type === 'text' && /*#__PURE__*/_react.default.createElement(_MuiTextInput.MuiTextInput, {
    chatController: chatCtl,
    actionRequest: actReq
  }), actReq && actReq.type === 'select' && /*#__PURE__*/_react.default.createElement(_MuiSelectInput.MuiSelectInput, {
    chatController: chatCtl,
    actionRequest: actReq
  }), actReq && actReq.type === 'multi-select' && /*#__PURE__*/_react.default.createElement(_MuiMultiSelectInput.MuiMultiSelectInput, {
    chatController: chatCtl,
    actionRequest: actReq
  }), actReq && actReq.type === 'file' && /*#__PURE__*/_react.default.createElement(_MuiFileInput.MuiFileInput, {
    chatController: chatCtl,
    actionRequest: actReq
  }), actReq && actReq.type === 'audio' && /*#__PURE__*/_react.default.createElement(_MuiAudioInput.MuiAudioInput, {
    chatController: chatCtl,
    actionRequest: actReq
  }), actReq && actReq.type === 'custom' && /*#__PURE__*/_react.default.createElement(CustomComponent, {
    chatController: chatCtl,
    actionRequest: actReq
  })));
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tdWkvTXVpQ2hhdC50c3giXSwibmFtZXMiOlsiTXVpQ2hhdCIsImNoYXRDb250cm9sbGVyIiwiY2hhdEN0bCIsIm1lc3NhZ2VzIiwic2V0TWVzc2FnZXMiLCJSZWFjdCIsInVzZVN0YXRlIiwiZ2V0TWVzc2FnZXMiLCJhY3RSZXEiLCJzZXRBY3RSZXEiLCJnZXRBY3Rpb25SZXF1ZXN0IiwibXNnUmVmIiwidXNlUmVmIiwic2Nyb2xsIiwidXNlQ2FsbGJhY2siLCJjdXJyZW50Iiwic2Nyb2xsVG9wIiwic2Nyb2xsSGVpZ2h0IiwidXNlRWZmZWN0IiwiaGFuZGxlTWFzc2FnZXNDaGFuZ2VkIiwiaGFuZGxlQWN0aW9uQ2hhbmdlZCIsImFkZE9uTWVzc2FnZXNDaGFuZ2VkIiwiYWRkT25BY3Rpb25DaGFuZ2VkIiwiQ3VzdG9tQ29tcG9uZW50IiwidXNlTWVtbyIsInR5cGUiLCJDb21wb25lbnQiLCJ1bmtub3duTXNnIiwiY29udGVudCIsInNlbGYiLCJwcmV2RGF0ZSIsInByZXZUaW1lIiwiaGVpZ2h0Iiwid2lkdGgiLCJwIiwiYmdjb2xvciIsImRpc3BsYXkiLCJmbGV4RGlyZWN0aW9uIiwibWF4V2lkdGgiLCJtdCIsImZsZXgiLCJvdmVyZmxvd1kiLCJXZWJraXRPdmVyZmxvd1Njcm9sbGluZyIsIm1hcCIsIm1zZyIsInNob3dEYXRlIiwic2hvd1RpbWUiLCJnZXRPcHRpb24iLCJzaG93RGF0ZVRpbWUiLCJkZWxldGVkQXQiLCJ1cGRhdGVkQXQiLCJjcmVhdGVkQXQiLCJmb3JtYXQiLCJkaWZmIiwiaW5kZXhPZiIsImFsaWduQ29udGVudCIsIm1pbldpZHRoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFhQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFTyxTQUFTQSxPQUFULENBQWlCO0FBQ3RCQyxFQUFBQTtBQURzQixDQUFqQixFQUlpQjtBQUN0QixRQUFNQyxPQUFPLEdBQUdELGNB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SUE3QkosRUFrQ0dBLE1BQU0sSUFBSUEsTUFBTSxDQUFDaUIsSUFBUCxLQUFnQixPQUExQixpQkFDQyw2QkFBQyw0QkFBRDtBQUNFLElBQUEsY0FBYyxFQUFFdkIsT0FEbEI7QUFFRSxJQUFBLGFBQWEsRUFBRU07QUFGakIsSUFuQ0osRUF3Q0dBLE1BQU0sSUFBSUEsTUFBTSxDQUFDaUIsSUFBUCxLQUFnQixRQUExQixpQkFDQyw2QkFBQyxlQUFEO0FBQ0UsSUFBQSxjQUFjLEVBQUV2QixPQURsQjtBQUVFLElBQUEsYUFBYSxFQUFFTTtBQUZqQixJQXpDSixDQXRFRixDQURGO0FBd0hEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQm94IH0gZnJvbSAnQG11aS9tYXRlcmlhbCc7XG5pbXBvcnQgZGF5anMgZnJvbSAnZGF5anMnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgQ2hhdENvbnRyb2xsZXIgfSBmcm9tICcuLi9jaGF0LWNvbnRyb2xsZXInO1xuaW1wb3J0IHtcbiAgQWN0aW9uUmVxdWVzdCxcbiAgQXVkaW9BY3Rpb25SZXF1ZXN0LFxuICBDdXN0b21BY3Rpb25SZXF1ZXN0LFxuICBGaWxlQWN0aW9uUmVxdWVzdCxcbiAgTXVsdGlTZWxlY3RBY3Rpb25SZXF1ZXN0LFxuICBTZWxlY3RBY3Rpb25SZXF1ZXN0LFxuICBUZXh0QWN0aW9uUmVxdWVzdCxcbn0gZnJvbSAnLi4vY2hhdC10eXBlcyc7XG5cbmltcG9ydCB7IE11aUF1ZGlvSW5wdXQgfSBmcm9tICcuL011aUF1ZGlvSW5wdXQnO1xuaW1wb3J0IHsgTXVpRmlsZUlucHV0IH0gZnJvbSAnLi9NdWlGaWxlSW5wdXQnO1xuaW1wb3J0IHsgTXVpTWVzc2FnZSB9IGZyb20gJy4vTXVpTWVzc2FnZSc7XG5pbXBvcnQgeyBNdWlNdWx0aVNlbGVjdElucHV0IH0gZnJvbSAnLi9NdWlNdWx0aVNlbGVjdElucHV0JztcbmltcG9ydCB7IE11aVNlbGVjdElucHV0IH0gZnJvbSAnLi9NdWlTZWxlY3RJbnB1dCc7XG5pbXBvcnQgeyBNdWlUZXh0SW5wdXQgfSBmcm9tICcuL011aVRleHRJbnB1dCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBNdWlDaGF0KHtcbiAgY2hhdENvbnRyb2xsZXIsXG59OiBSZWFjdC5Qcm9wc1dpdGhDaGlsZHJlbjx7XG4gIGNoYXRDb250cm9sbGVyOiBDaGF0Q29udHJvbGxlcjtcbn0+KTogUmVhY3QuUmVhY3RFbGVtZW50IHtcbiAgY29uc3QgY2hhdEN0bCA9IGNoYXRDb250cm9sbGVyO1xuICBjb25zdCBbbWVzc2FnZXMsIHNldE1lc3NhZ2VzXSA9IFJlYWN0LnVzZVN0YXRlKGNoYXRDdGwuZ2V0TWVzc2FnZXMoKSk7XG4gIGNvbnN0IFthY3RSZXEsIHNldEFjdFJlcV0gPSBSZWFjdC51c2VTdGF0ZShjaGF0Q3RsLmdldEFjdGlvblJlcXVlc3QoKSk7XG5cbiAgY29uc3QgbXNnUmVmID0gUmVhY3QudXNlUmVmPEhUTUxEaXZFbGVtZW50PihudWxsKTtcbiAgY29uc3Qgc2Nyb2xsID0gUmVhY3QudXNlQ2FsbGJhY2soKCk6IHZvaWQgPT4ge1xuICAgIGlmIChtc2dSZWYuY3VycmVudCkge1xuICAgICAgbXNnUmVmLmN1cnJlbnQuc2Nyb2xsVG9wID0gbXNnUmVmLmN1cnJlbnQuc2Nyb2xsSGVpZ2h0O1xuICAgICAgLy8gbXNnUmVmLmN1cnJlbnQuc2Nyb2xsSW50b1ZpZXcodHJ1ZSk7XG4gICAgfVxuICB9LCBbbXNnUmVmXSk7XG4gIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgZnVuY3Rpb24gaGFuZGxlTWFzc2FnZXNDaGFuZ2VkKCk6IHZvaWQge1xuICAgICAgc2V0TWVzc2FnZXMoWy4uLmNoYXRDdGwuZ2V0TWVzc2FnZXMoKV0pO1xuICAgICAgc2Nyb2xsKCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGhhbmRsZUFjdGlvbkNoYW5nZWQoKTogdm9pZCB7XG4gICAgICBzZXRBY3RSZXEoY2hhdEN0bC5nZXRBY3Rpb25SZXF1ZXN0KCkpO1xuICAgICAgc2Nyb2xsKCk7XG4gICAgfVxuICAgIGNoYXRDdGwuYWRkT25NZXNzYWdlc0NoYW5nZWQoaGFuZGxlTWFzc2FnZXNDaGFuZ2VkKTtcbiAgICBjaGF0Q3RsLmFkZE9uQWN0aW9uQ2hhbmdlZChoYW5kbGVBY3Rpb25DaGFuZ2VkKTtcbiAgfSwgW2NoYXRDdGwsIHNjcm9sbF0pO1xuXG4gIHR5cGUgQ3VzdG9tQ29tcG9uZW50VHlwZSA9IFJlYWN0LkZDPHtcbiAgICBjaGF0Q29udHJvbGxlcjogQ2hhdENvbnRyb2xsZXI7XG4gICAgYWN0aW9uUmVxdWVzdDogQWN0aW9uUmVxdWVzdDtcbiAgfT47XG4gIGNvbnN0IEN1c3RvbUNvbXBvbmVudCA9IFJlYWN0LnVzZU1lbW8oKCk6IEN1c3RvbUNvbXBvbmVudFR5cGUgPT4ge1xuICAgIGlmICghYWN0UmVxIHx8IGFjdFJlcS50eXBlICE9PSAnY3VzdG9tJykge1xuICAgICAgcmV0dXJuIG51bGwgYXMgdW5rbm93biBhcyBDdXN0b21Db21wb25lbnRUeXBlO1xuICAgIH1cbiAgICByZXR1cm4gKGFjdFJlcSBhcyBDdXN0b21BY3Rpb25SZXF1ZXN0KVxuICAgICAgLkNvbXBvbmVudCBhcyB1bmtub3duIGFzIEN1c3RvbUNvbXBvbmVudFR5cGU7XG4gIH0sIFthY3RSZXFdKTtcblxuICBjb25zdCB1bmtub3duTXNnID0ge1xuICAgIHR5cGU6ICd0ZXh0JyxcbiAgICBjb250ZW50OiAnVW5rbm93biBtZXNzYWdlLicsXG4gICAgc2VsZjogZmFsc2UsXG4gIH07XG5cbiAgbGV0IHByZXZEYXRlID0gZGF5anMoMCk7XG4gIGxldCBwcmV2VGltZSA9IGRheWpzKDApO1xuXG4gIHJldHVybiAoXG4gICAgPEJveFxuICAgICAgc3g9e3tcbiAgICAgICAgaGVpZ2h0OiAnMTAwJScsXG4gICAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICAgIHA6IDEsXG4gICAgICAgIGJnY29sb3I6ICdiYWNrZ3JvdW5kLmRlZmF1bHQnLFxuICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLFxuICAgICAgICAnJiA+IConOiB7XG4gICAgICAgICAgbWF4V2lkdGg6ICcxMDAlJyxcbiAgICAgICAgfSxcbiAgICAgICAgJyYgPiAqICsgKic6IHtcbiAgICAgICAgICBtdDogMSxcbiAgICAgICAgfSxcbiAgICAgIH19XG4gICAgPlxuICAgICAgPEJveFxuICAgICAgICBzeD17e1xuICAgICAgICAgIGZsZXg6ICcxIDEgMCUnLFxuICAgICAgICAgIG92ZXJmbG93WTogJ2F1dG8nLFxuICAgICAgICAgIFdlYmtpdE92ZXJmbG93U2Nyb2xsaW5nOiAndG91Y2gnLFxuICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJyxcbiAgICAgICAgICAnJiA+IConOiB7XG4gICAgICAgICAgICBtYXhXaWR0aDogJzEwMCUnLFxuICAgICAgICAgIH0sXG4gICAgICAgIH19XG4gICAgICAgIHJlZj17bXNnUmVmfVxuICAgICAgPlxuICAgICAgICB7bWVzc2FnZXMubWFwKChtc2cpOiBSZWFjdC5SZWFjdEVsZW1lbnQgPT4ge1xuICAgICAgICAgIGxldCBzaG93RGF0ZSA9IGZhbHNlO1xuICAgICAgICAgIGxldCBzaG93VGltZSA9ICEhY2hhdEN0bC5nZXRPcHRpb24oKS5zaG93RGF0ZVRpbWU7XG4gICAgICAgICAgaWYgKCEhY2hhdEN0bC5nZXRPcHRpb24oKS5zaG93RGF0ZVRpbWUgJiYgIW1zZy5kZWxldGVkQXQpIHtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnQgPSBkYXlqcyhcbiAgICAgICAgICAgICAgbXNnLnVwZGF0ZWRBdCA/IG1zZy51cGRhdGVkQXQgOiBtc2cuY3JlYXRlZEF0LFxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgaWYgKGN1cnJlbnQuZm9ybWF0KCdZWVlZTU1ERCcpICE9PSBwcmV2RGF0ZS5mb3JtYXQoJ1lZWVlNTUREJykpIHtcbiAgICAgICAgICAgICAgc2hvd0RhdGUgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcHJldkRhdGUgPSBjdXJyZW50O1xuXG4gICAgICAgICAgICBpZiAoY3VycmVudC5kaWZmKHByZXZUaW1lKSA8IDYwXzAwMCkge1xuICAgICAgICAgICAgICBzaG93VGltZSA9IGZhbHNlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcHJldlRpbWUgPSBjdXJyZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAobXNnLnR5cGUgPT09ICd0ZXh0JyB8fCBtc2cudHlwZSA9PT0gJ2pzeCcpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgIDxNdWlNZXNzYWdlXG4gICAgICAgICAgICAgICAga2V5PXttZXNzYWdlcy5pbmRleE9mKG1zZyl9XG4gICAgICAgICAgICAgICAgaWQ9e2BjdS1tc2ctJHttZXNzYWdlcy5pbmRleE9mKG1zZykgKyAxfWB9XG4gICAgICAgICAgICAgICAgbWVzc2FnZT17bXNnfVxuICAgICAgICAgICAgICAgIHNob3dEYXRlPXtzaG93RGF0ZX1cbiAgICAgICAgICAgICAgICBzaG93VGltZT17c2hvd1RpbWV9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPE11aU1lc3NhZ2VcbiAgICAgICAgICAgICAga2V5PXttZXNzYWdlcy5pbmRleE9mKG1zZyl9XG4gICAgICAgICAgICAgIGlkPXtgY3UtbXNnLSR7bWVzc2FnZXMuaW5kZXhPZihtc2cpICsgMX1gfVxuICAgICAgICAgICAgICBtZXNzYWdlPXt1bmtub3duTXNnfVxuICAgICAgICAgICAgICBzaG93RGF0ZT17c2hvd0RhdGV9XG4gICAgICAgICAgICAgIHNob3dUaW1lPXtzaG93VGltZX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKTtcbiAgICAgICAgfSl9XG4gICAgICA8L0JveD5cbiAgICAgIDxCb3hcbiAgICAgICAgc3g9e3tcbiAgICAgICAgICBmbGV4OiAnMCAxIGF1dG8nLFxuICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICBhbGlnbkNvbnRlbnQ6ICdmbGV4LWVuZCcsXG4gICAgICAgICAgJyYgPiAqJzoge1xuICAgICAgICAgICAgbWluV2lkdGg6IDAsXG4gICAgICAgICAgfSxcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAge2FjdFJlcSAmJiBhY3RSZXEudHlwZSA9PT0gJ3RleHQnICYmIChcbiAgICAgICAgICA8TXVpVGV4dElucHV0XG4gICAgICAgICAgICBjaGF0Q29udHJvbGxlcj17Y2hhdEN0bH1cbiAgICAgICAgICAgIGFjdGlvblJlcXVlc3Q9e2FjdFJlcSBhcyBUZXh0QWN0aW9uUmVxdWVzdH1cbiAgICAgICAgICAvPlxuICAgICAgICApfVxuICAgICAgICB7YWN0UmVxICYmIGFjdFJlcS50eXBlID09PSAnc2VsZWN0JyAmJiAoXG4gICAgICAgICAgPE11aVNlbGVjdElucHV0XG4gICAgICAgICAgICBjaGF0Q29udHJvbGxlcj17Y2hhdEN0bH1cbiAgICAgICAgICAgIGFjdGlvblJlcXVlc3Q9e2FjdFJlcSBhcyBTZWxlY3RBY3Rpb25SZXF1ZXN0fVxuICAgICAgICAgIC8+XG4gICAgICAgICl9XG4gICAgICAgIHthY3RSZXEgJiYgYWN0UmVxLnR5cGUgPT09ICdtdWx0aS1zZWxlY3QnICYmIChcbiAgICAgICAgICA8TXVpTXVsdGlTZWxlY3RJbnB1dFxuICAgICAgICAgICAgY2hhdENvbnRyb2xsZXI9e2NoYXRDdGx9XG4gICAgICAgICAgICBhY3Rpb25SZXF1ZXN0PXthY3RSZXEgYXMgTXVsdGlTZWxlY3RBY3Rpb25SZXF1ZXN0fVxuICAgICAgICAgIC8+XG4gICAgICAgICl9XG4gICAgICAgIHthY3RSZXEgJiYgYWN0UmVxLnR5cGUgPT09ICdmaWxlJyAmJiAoXG4gICAgICAgICAgPE11aUZpbGVJbnB1dFxuICAgICAgICAgICAgY2hhdENvbnRyb2xsZXI9e2NoYXRDdGx9XG4gICAgICAgICAgICBhY3Rpb25SZXF1ZXN0PXthY3RSZXEgYXMgRmlsZUFjdGlvblJlcXVlc3R9XG4gICAgICAgICAgLz5cbiAgICAgICAgKX1cbiAgICAgICAge2FjdFJlcSAmJiBhY3RSZXEudHlwZSA9PT0gJ2F1ZGlvJyAmJiAoXG4gICAgICAgICAgPE11aUF1ZGlvSW5wdXRcbiAgICAgICAgICAgIGNoYXRDb250cm9sbGVyPXtjaGF0Q3RsfVxuICAgICAgICAgICAgYWN0aW9uUmVxdWVzdD17YWN0UmVxIGFzIEF1ZGlvQWN0aW9uUmVxdWVzdH1cbiAgICAgICAgICAvPlxuICAgICAgICApfVxuICAgICAgICB7YWN0UmVxICYmIGFjdFJlcS50eXBlID09PSAnY3VzdG9tJyAmJiAoXG4gICAgICAgICAgPEN1c3RvbUNvbXBvbmVudFxuICAgICAgICAgICAgY2hhdENvbnRyb2xsZXI9e2NoYXRDdGx9XG4gICAgICAgICAgICBhY3Rpb25SZXF1ZXN0PXthY3RSZXEgYXMgQ3VzdG9tQWN0aW9uUmVxdWVzdH1cbiAgICAgICAgICAvPlxuICAgICAgICApfVxuICAgICAgPC9Cb3g+XG4gICAgPC9Cb3g+XG4gICk7XG59XG4iXX0=