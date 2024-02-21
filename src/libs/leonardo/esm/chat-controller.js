import _objectSpread from "@babel/runtime/helpers/esm/objectSpread2";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
export class ChatController {
  constructor(option) {
    _defineProperty(this, "state", void 0);

    _defineProperty(this, "defaultOption", {
      delay: 300
    });

    _defineProperty(this, "emptyAction", {
      request: {
        type: 'empty'
      },
      responses: [],
      onResnponsed: []
    });

    _defineProperty(this, "defaultActionRequest", {
      always: false,
      addMessage: true
    });

    this.state = {
      option: _objectSpread(_objectSpread({}, this.defaultOption), option),
      messages: [],
      action: this.emptyAction,
      actionHistory: [],
      onMessagesChanged: [],
      onActionChanged: []
    };
  }

  addMessage(message) {
    return new Promise(resolve => {
      setTimeout(() => {
        const len = this.state.messages.push(message);
        const idx = len - 1;
        this.state.messages[idx].createdAt = new Date();
        this.callOnMessagesChanged();
        resolve(idx);
      }, this.state.option.delay);
    });
  }

  updateMessage(index, message) {
    if (message !== this.state.messages[index]) {
      const {
        createdAt
      } = this.state.messages[index];
      this.state.messages[index] = message;
      this.state.messages[index].createdAt = createdAt;
    }

    this.state.messages[index].updatedAt = new Date();
    this.callOnMessagesChanged();
  }

  removeMessage(index) {
    this.state.messages[index].deletedAt = new Date();
    this.callOnMessagesChanged();
  }

  getMessages() {
    return this.state.messages;
  }

  setMessages(messages) {
    this.clearMessages();
    this.state.messages = [...messages];
    this.callOnMessagesChanged();
  }

  clearMessages() {
    this.state.messages = [];
    this.callOnMessagesChanged();
  }

  callOnMessagesChanged() {
    this.state.onMessagesChanged.map(h => h(this.state.messages));
  }

  addOnMessagesChanged(callback) {
    this.state.onMessagesChanged.push(callback);
  }

  removeOnMessagesChanged(callback) {
    const idx = this.state.onMessagesChanged.indexOf(callback); // eslint-disable-next-line @typescript-eslint/no-empty-function

    this.state.onActionChanged[idx] = () => {};
  }

  setActionRequest(request, onResponse) {
    const action = {
      request: _objectSpread(_objectSpread({}, this.defaultActionRequest), request),
      responses: [],
      onResnponsed: []
    }; // See setActionResponse method

    return new Promise((resolve, reject) => {
      if (!request.always) {
        const returnResponse = response => {
          if (!response.error) {
            resolve(response);
          } else {
            reject(response.error);
          }
        };

        action.onResnponsed.push(returnResponse);
      }

      if (onResponse) {
        action.onResnponsed.push(onResponse);
      }

      this.state.action = action;
      this.state.actionHistory.push(action);
      this.callOnActionChanged(action.request);

      if (request.always) {
        resolve({
          type: 'text',
          value: 'dummy'
        });
      }
    });
  }

  cancelActionRequest() {
    this.state.action = this.emptyAction;
    this.callOnActionChanged(this.emptyAction.request);
  }

  getActionRequest() {
    const {
      request,
      responses
    } = this.state.action;

    if (!request.always && responses.length > 0) {
      return undefined;
    }

    return request;
  }

  async setActionResponse(request, response) {
    const {
      request: origReq,
      responses,
      onResnponsed
    } = this.state.action;

    if (request !== origReq) {
      throw new Error('Invalid action.');
    }

    if (!request.always && onResnponsed.length === 0) {
      throw new Error('onResponsed is not set.');
    }

    responses.push(response);
    this.callOnActionChanged(request, response);

    if (request.addMessage) {
      await this.addMessage({
        type: 'text',
        content: response.value,
        self: true
      });
    }

    onResnponsed.map(h => h(response));
  }

  getActionResponses() {
    return this.state.action.responses;
  }

  callOnActionChanged(request, response) {
    this.state.onActionChanged.map(h => h(request, response));
  }

  addOnActionChanged(callback) {
    this.state.onActionChanged.push(callback);
  }

  removeOnActionChanged(callback) {
    const idx = this.state.onActionChanged.indexOf(callback); // eslint-disable-next-line @typescript-eslint/no-empty-function

    this.state.onActionChanged[idx] = () => {};
  }

  getOption() {
    return this.state.option;
  }

}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jaGF0LWNvbnRyb2xsZXIudHMiXSwibmFtZXMiOlsiQ2hhdENvbnRyb2xsZXIiLCJjb25zdHJ1Y3RvciIsIm9wdGlvbiIsImRlbGF5IiwicmVxdWVzdCIsInR5cGUiLCJyZXNwb25zZXMiLCJvblJlc25wb25zZWQiLCJhbHdheXMiLCJhZGRNZXNzYWdlIiwic3RhdGUiLCJkZWZhdWx0T3B0aW9uIiwibWVzc2FnZXMiLCJhY3Rpb24iLCJlbXB0eUFjdGlvbiIsImFjdGlvbkhpc3RvcnkiLCJvbk1lc3NhZ2VzQ2hhbmdlZCIsIm9uQWN0aW9uQ2hhbmdlZCIsIm1lc3NhZ2UiLCJQcm9taXNlIiwicmVzb2x2ZSIsInNldFRpbWVvdXQiLCJsZW4iLCJwdXNoIiwiaWR4IiwiY3JlYXRlZEF0IiwiRGF0ZSIsImNhbGxPbk1lc3NhZ2VzQ2hhbmdlZCIsInVwZGF0ZU1lc3NhZ2UiLCJpbmRleCIsInVwZGF0ZWRBdCIsInJlbW92ZU1lc3NhZ2UiLCJkZWxldGVkQXQiLCJnZXRNZXNzYWdlcyIsInNldE1lc3NhZ2VzIiwiY2xlYXJNZXNzYWdlcyIsIm1hcCIsImgiLCJhZGRPbk1lc3NhZ2VzQ2hhbmdlZCIsImNhbGxiYWNrIiwicmVtb3ZlT25NZXNzYWdlc0NoYW5nZWQiLCJpbmRleE9mIiwic2V0QWN0aW9uUmVxdWVzdCIsIm9uUmVzcG9uc2UiLCJkZWZhdWx0QWN0aW9uUmVxdWVzdCIsInJlamVjdCIsInJldHVyblJlc3BvbnNlIiwicmVzcG9uc2UiLCJlcnJvciIsImNhbGxPbkFjdGlvbkNoYW5nZWQiLCJ2YWx1ZSIsImNhbmNlbEFjdGlvblJlcXVlc3QiLCJnZXRBY3Rpb25SZXF1ZXN0IiwibGVuZ3RoIiwidW5kZWZpbmVkIiwic2V0QWN0aW9uUmVzcG9uc2UiLCJvcmlnUmVxIiwiRXJyb3IiLCJjb250ZW50Iiwic2VsZiIsImdldEFjdGlvblJlc3BvbnNlcyIsImFkZE9uQWN0aW9uQ2hhbmdlZCIsInJlbW92ZU9uQWN0aW9uQ2hhbmdlZCIsImdl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QUs3QixLQUFMLENBQVdPLGVBQVgsQ0FBMkJNLElBQTNCLENBQWdDZ0IsUUFBaEM7QUFDRDs7QUFFRHVCLEVBQUFBLHFCQUFxQixDQUFDdkIsUUFBRCxFQUFrQztBQUNyRCxVQUFNZixHQUFHLEdBQUcsS0FBS2QsS0FBTCxDQUFXTyxlQUFYLENBQTJCd0IsT0FBM0IsQ0FBbUNGLFFBQW5DLENBQVosQ0FEcUQsQ0FFckQ7O0FBQ0EsU0FBSzdCLEtBQUwsQ0FBV08sZUFBWCxDQUEyQk8sR0FBM0IsSUFBa0MsTUFBWSxDQUFFLENBQWhEO0FBQ0Q7O0FBRUR1QyxFQUFBQSxTQUFTLEdBQWU7QUFDdEIsV0FBTyxLQUFLckQsS0FBTCxDQUFXUixNQUFsQjtBQUNEOztBQTNMeUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBY3Rpb25SZXF1ZXN0LFxuICBBY3Rpb25SZXNwb25zZSxcbiAgQ2hhdE9wdGlvbixcbiAgTWVzc2FnZSxcbiAgTWVzc2FnZUNvbnRlbnQsXG4gIE9uQWN0aW9uQ2hhbmdlZCxcbiAgT25BY3Rpb25SZXNwb25zZWQsXG4gIE9uTWVzc2FnZXNDaGFuZ2VkLFxufSBmcm9tICcuL2NoYXQtdHlwZXMnO1xuXG5pbnRlcmZhY2UgQ2hhdFN0YXRlIHtcbiAgb3B0aW9uOiBDaGF0T3B0aW9uO1xuICBtZXNzYWdlczogTWVzc2FnZTxNZXNzYWdlQ29udGVudD5bXTtcbiAgYWN0aW9uOiBBY3Rpb247XG4gIGFjdGlvbkhpc3Rvcnk6IEFjdGlvbltdO1xuICBvbk1lc3NhZ2VzQ2hhbmdlZDogT25NZXNzYWdlc0NoYW5nZWRbXTtcbiAgb25BY3Rpb25DaGFuZ2VkOiBPbkFjdGlvbkNoYW5nZWRbXTtcbn1cblxuaW50ZXJmYWNlIEFjdGlvbiB7XG4gIHJlcXVlc3Q6IEFjdGlvblJlcXVlc3Q7XG4gIHJlc3BvbnNlczogQWN0aW9uUmVzcG9uc2VbXTtcbiAgb25SZXNucG9uc2VkOiBPbkFjdGlvblJlc3BvbnNlZFtdO1xufVxuXG5leHBvcnQgY2xhc3MgQ2hhdENvbnRyb2xsZXIge1xuICBwcml2YXRlIHN0YXRlOiBDaGF0U3RhdGU7XG5cbiAgcHJpdmF0ZSBkZWZhdWx0T3B0aW9uOiBDaGF0T3B0aW9uID0ge1xuICAgIGRlbGF5OiAzMDAsXG4gIH07XG5cbiAgcHJpdmF0ZSBlbXB0eUFjdGlvbjogQWN0aW9uID0ge1xuICAgIHJlcXVlc3Q6IHsgdHlwZTogJ2VtcHR5JyB9LFxuICAgIHJlc3BvbnNlczogW10sXG4gICAgb25SZXNucG9uc2VkOiBbXSxcbiAgfTtcblxuICBwcml2YXRlIGRlZmF1bHRBY3Rpb25SZXF1ZXN0ID0ge1xuICAgIGFsd2F5czogZmFsc2UsXG4gICAgYWRkTWVzc2FnZTogdHJ1ZSxcbiAgfTtcblxuICBjb25zdHJ1Y3RvcihvcHRpb24/OiBDaGF0T3B0aW9uKSB7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIG9wdGlvbjogeyAuLi50aGlzLmRlZmF1bHRPcHRpb24sIC4uLm9wdGlvbiB9LFxuICAgICAgbWVzc2FnZXM6IFtdLFxuICAgICAgYWN0aW9uOiB0aGlzLmVtcHR5QWN0aW9uLFxuICAgICAgYWN0aW9uSGlzdG9yeTogW10sXG4gICAgICBvbk1lc3NhZ2VzQ2hhbmdlZDogW10sXG4gICAgICBvbkFjdGlvbkNoYW5nZWQ6IFtdLFxuICAgIH07XG4gIH1cblxuICBhZGRNZXNzYWdlKG1lc3NhZ2U6IE1lc3NhZ2U8TWVzc2FnZUNvbnRlbnQ+KTogUHJvbWlzZTxudW1iZXI+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBjb25zdCBsZW4gPSB0aGlzLnN0YXRlLm1lc3NhZ2VzLnB1c2gobWVzc2FnZSk7XG4gICAgICAgIGNvbnN0IGlkeCA9IGxlbiAtIDE7XG4gICAgICAgIHRoaXMuc3RhdGUubWVzc2FnZXNbaWR4XS5jcmVhdGVkQXQgPSBuZXcgRGF0ZSgpO1xuICAgICAgICB0aGlzLmNhbGxPbk1lc3NhZ2VzQ2hhbmdlZCgpO1xuXG4gICAgICAgIHJlc29sdmUoaWR4KTtcbiAgICAgIH0sIHRoaXMuc3RhdGUub3B0aW9uLmRlbGF5KTtcbiAgICB9KTtcbiAgfVxuXG4gIHVwZGF0ZU1lc3NhZ2UoaW5kZXg6IG51bWJlciwgbWVzc2FnZTogTWVzc2FnZTxNZXNzYWdlQ29udGVudD4pOiB2b2lkIHtcbiAgICBpZiAobWVzc2FnZSAhPT0gdGhpcy5zdGF0ZS5tZXNzYWdlc1tpbmRleF0pIHtcbiAgICAgIGNvbnN0IHsgY3JlYXRlZEF0IH0gPSB0aGlzLnN0YXRlLm1lc3NhZ2VzW2luZGV4XTtcbiAgICAgIHRoaXMuc3RhdGUubWVzc2FnZXNbaW5kZXhdID0gbWVzc2FnZTtcbiAgICAgIHRoaXMuc3RhdGUubWVzc2FnZXNbaW5kZXhdLmNyZWF0ZWRBdCA9IGNyZWF0ZWRBdDtcbiAgICB9XG5cbiAgICB0aGlzLnN0YXRlLm1lc3NhZ2VzW2luZGV4XS51cGRhdGVkQXQgPSBuZXcgRGF0ZSgpO1xuICAgIHRoaXMuY2FsbE9uTWVzc2FnZXNDaGFuZ2VkKCk7XG4gIH1cblxuICByZW1vdmVNZXNzYWdlKGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLnN0YXRlLm1lc3NhZ2VzW2luZGV4XS5kZWxldGVkQXQgPSBuZXcgRGF0ZSgpO1xuICAgIHRoaXMuY2FsbE9uTWVzc2FnZXNDaGFuZ2VkKCk7XG4gIH1cblxuICBnZXRNZXNzYWdlcygpOiBNZXNzYWdlPE1lc3NhZ2VDb250ZW50PltdIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0ZS5tZXNzYWdlcztcbiAgfVxuXG4gIHNldE1lc3NhZ2VzKG1lc3NhZ2VzOiBNZXNzYWdlPE1lc3NhZ2VDb250ZW50PltdKTogdm9pZCB7XG4gICAgdGhpcy5jbGVhck1lc3NhZ2VzKCk7XG4gICAgdGhpcy5zdGF0ZS5tZXNzYWdlcyA9IFsuLi5tZXNzYWdlc107XG4gICAgdGhpcy5jYWxsT25NZXNzYWdlc0NoYW5nZWQoKTtcbiAgfVxuXG4gIGNsZWFyTWVzc2FnZXMoKTogdm9pZCB7XG4gICAgdGhpcy5zdGF0ZS5tZXNzYWdlcyA9IFtdO1xuICAgIHRoaXMuY2FsbE9uTWVzc2FnZXNDaGFuZ2VkKCk7XG4gIH1cblxuICBwcml2YXRlIGNhbGxPbk1lc3NhZ2VzQ2hhbmdlZCgpOiB2b2lkIHtcbiAgICB0aGlzLnN0YXRlLm9uTWVzc2FnZXNDaGFuZ2VkLm1hcCgoaCkgPT4gaCh0aGlzLnN0YXRlLm1lc3NhZ2VzKSk7XG4gIH1cblxuICBhZGRPbk1lc3NhZ2VzQ2hhbmdlZChjYWxsYmFjazogT25NZXNzYWdlc0NoYW5nZWQpOiB2b2lkIHtcbiAgICB0aGlzLnN0YXRlLm9uTWVzc2FnZXNDaGFuZ2VkLnB1c2goY2FsbGJhY2spO1xuICB9XG5cbiAgcmVtb3ZlT25NZXNzYWdlc0NoYW5nZWQoY2FsbGJhY2s6IE9uTWVzc2FnZXNDaGFuZ2VkKTogdm9pZCB7XG4gICAgY29uc3QgaWR4ID0gdGhpcy5zdGF0ZS5vbk1lc3NhZ2VzQ2hhbmdlZC5pbmRleE9mKGNhbGxiYWNrKTtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWVtcHR5LWZ1bmN0aW9uXG4gICAgdGhpcy5zdGF0ZS5vbkFjdGlvbkNoYW5nZWRbaWR4XSA9ICgpOiB2b2lkID0+IHt9O1xuICB9XG5cbiAgc2V0QWN0aW9uUmVxdWVzdDxUIGV4dGVuZHMgQWN0aW9uUmVxdWVzdD4oXG4gICAgcmVxdWVzdDogVCxcbiAgICBvblJlc3BvbnNlPzogT25BY3Rpb25SZXNwb25zZWQsXG4gICk6IFByb21pc2U8QWN0aW9uUmVzcG9uc2U+IHtcbiAgICBjb25zdCBhY3Rpb246IEFjdGlvbiA9IHtcbiAgICAgIHJlcXVlc3Q6IHsgLi4udGhpcy5kZWZhdWx0QWN0aW9uUmVxdWVzdCwgLi4ucmVxdWVzdCB9LFxuICAgICAgcmVzcG9uc2VzOiBbXSxcbiAgICAgIG9uUmVzbnBvbnNlZDogW10sXG4gICAgfTtcblxuICAgIC8vIFNlZSBzZXRBY3Rpb25SZXNwb25zZSBtZXRob2RcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgaWYgKCFyZXF1ZXN0LmFsd2F5cykge1xuICAgICAgICBjb25zdCByZXR1cm5SZXNwb25zZSA9IChyZXNwb25zZTogQWN0aW9uUmVzcG9uc2UpOiB2b2lkID0+IHtcbiAgICAgICAgICBpZiAoIXJlc3BvbnNlLmVycm9yKSB7XG4gICAgICAgICAgICByZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVqZWN0KHJlc3BvbnNlLmVycm9yKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGFjdGlvbi5vblJlc25wb25zZWQucHVzaChyZXR1cm5SZXNwb25zZSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChvblJlc3BvbnNlKSB7XG4gICAgICAgIGFjdGlvbi5vblJlc25wb25zZWQucHVzaChvblJlc3BvbnNlKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5zdGF0ZS5hY3Rpb24gPSBhY3Rpb247XG4gICAgICB0aGlzLnN0YXRlLmFjdGlvbkhpc3RvcnkucHVzaChhY3Rpb24pO1xuICAgICAgdGhpcy5jYWxsT25BY3Rpb25DaGFuZ2VkKGFjdGlvbi5yZXF1ZXN0KTtcblxuICAgICAgaWYgKHJlcXVlc3QuYWx3YXlzKSB7XG4gICAgICAgIHJlc29sdmUoeyB0eXBlOiAndGV4dCcsIHZhbHVlOiAnZHVtbXknIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgY2FuY2VsQWN0aW9uUmVxdWVzdCgpOiB2b2lkIHtcbiAgICB0aGlzLnN0YXRlLmFjdGlvbiA9IHRoaXMuZW1wdHlBY3Rpb247XG4gICAgdGhpcy5jYWxsT25BY3Rpb25DaGFuZ2VkKHRoaXMuZW1wdHlBY3Rpb24ucmVxdWVzdCk7XG4gIH1cblxuICBnZXRBY3Rpb25SZXF1ZXN0KCk6IEFjdGlvblJlcXVlc3QgfCB1bmRlZmluZWQge1xuICAgIGNvbnN0IHsgcmVxdWVzdCwgcmVzcG9uc2VzIH0gPSB0aGlzLnN0YXRlLmFjdGlvbjtcbiAgICBpZiAoIXJlcXVlc3QuYWx3YXlzICYmIHJlc3BvbnNlcy5sZW5ndGggPiAwKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHJldHVybiByZXF1ZXN0O1xuICB9XG5cbiAgYXN5bmMgc2V0QWN0aW9uUmVzcG9uc2UoXG4gICAgcmVxdWVzdDogQWN0aW9uUmVxdWVzdCxcbiAgICByZXNwb25zZTogQWN0aW9uUmVzcG9uc2UsXG4gICk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHsgcmVxdWVzdDogb3JpZ1JlcSwgcmVzcG9uc2VzLCBvblJlc25wb25zZWQgfSA9IHRoaXMuc3RhdGUuYWN0aW9uO1xuICAgIGlmIChyZXF1ZXN0ICE9PSBvcmlnUmVxKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgYWN0aW9uLicpO1xuICAgIH1cbiAgICBpZiAoIXJlcXVlc3QuYWx3YXlzICYmIG9uUmVzbnBvbnNlZC5sZW5ndGggPT09IDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignb25SZXNwb25zZWQgaXMgbm90IHNldC4nKTtcbiAgICB9XG5cbiAgICByZXNwb25zZXMucHVzaChyZXNwb25zZSk7XG4gICAgdGhpcy5jYWxsT25BY3Rpb25DaGFuZ2VkKHJlcXVlc3QsIHJlc3BvbnNlKTtcblxuICAgIGlmIChyZXF1ZXN0LmFkZE1lc3NhZ2UpIHtcbiAgICAgIGF3YWl0IHRoaXMuYWRkTWVzc2FnZSh7XG4gICAgICAgIHR5cGU6ICd0ZXh0JyxcbiAgICAgICAgY29udGVudDogcmVzcG9uc2UudmFsdWUsXG4gICAgICAgIHNlbGY6IHRydWUsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBvblJlc25wb25zZWQubWFwKChoKSA9PiBoKHJlc3BvbnNlKSk7XG4gIH1cblxuICBnZXRBY3Rpb25SZXNwb25zZXMoKTogQWN0aW9uUmVzcG9uc2VbXSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGUuYWN0aW9uLnJlc3BvbnNlcztcbiAgfVxuXG4gIHByaXZhdGUgY2FsbE9uQWN0aW9uQ2hhbmdlZChcbiAgICByZXF1ZXN0OiBBY3Rpb25SZXF1ZXN0LFxuICAgIHJlc3BvbnNlPzogQWN0aW9uUmVzcG9uc2UsXG4gICk6IHZvaWQge1xuICAgIHRoaXMuc3RhdGUub25BY3Rpb25DaGFuZ2VkLm1hcCgoaCkgPT4gaChyZXF1ZXN0LCByZXNwb25zZSkpO1xuICB9XG5cbiAgYWRkT25BY3Rpb25DaGFuZ2VkKGNhbGxiYWNrOiBPbkFjdGlvbkNoYW5nZWQpOiB2b2lkIHtcbiAgICB0aGlzLnN0YXRlLm9uQWN0aW9uQ2hhbmdlZC5wdXNoKGNhbGxiYWNrKTtcbiAgfVxuXG4gIHJlbW92ZU9uQWN0aW9uQ2hhbmdlZChjYWxsYmFjazogT25BY3Rpb25DaGFuZ2VkKTogdm9pZCB7XG4gICAgY29uc3QgaWR4ID0gdGhpcy5zdGF0ZS5vbkFjdGlvbkNoYW5nZWQuaW5kZXhPZihjYWxsYmFjayk7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1lbXB0eS1mdW5jdGlvblxuICAgIHRoaXMuc3RhdGUub25BY3Rpb25DaGFuZ2VkW2lkeF0gPSAoKTogdm9pZCA9PiB7fTtcbiAgfVxuXG4gIGdldE9wdGlvbigpOiBDaGF0T3B0aW9uIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0ZS5vcHRpb247XG4gIH1cbn1cbiJdfQ==