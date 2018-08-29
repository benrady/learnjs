onmessage = function(e) {
  console.log('worker.onmessage')

  console.log(e)
  console.log('data' + e.data)
  try {
    postMessage(eval(e.data))
  } catch (e) {
    postMessage(false)
  }
}
