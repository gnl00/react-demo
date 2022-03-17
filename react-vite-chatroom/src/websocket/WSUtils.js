import emitter from "../util/EmitterUtils";

export const onOpen = (param) => {
  console.log(param, ' opened')
}

export const onClose = (param, evt) => {
  console.log(param, ' closed ', evt)
}
export const onError = (param, evt) => {
  console.log(param, ' error ', evt)
}

export const onMessage = (emitEvt, message) => {
  emitter.emit(emitEvt, message)
}