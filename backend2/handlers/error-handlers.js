const catchErrors = (fn) => {
  return function(req, res, next){
    fn(req, res, next).catch((err) => {
      if(typeof err == "string"){
        res.status(400).json({
          message: err
        })
      }else{
        next(err)
		err
      }
    })
  }
}

const mongooseErrors = (err, req, res, next) => {
	if (!err.errors) return next(err)
	const errorKeys = Object.keys(err.errors)
	let message = ''
	errorKeys.forEach(key => (message += err.errors[key].message + ', '))
	message = message.substr(0, message.length - 2)
	res.status(400).json({
		message
	})
}

const developmentErrors = (err, req, res, next) => {
	err.stack = err.stack || ''
	const errorDetails = {
		message: err.message,
		status: err.status,
		stack: err.stack
	}
	res.status(err.status || 500).json({
		error: errorDetails
	})
}

const productionErrors = (err, req, res, next) => {
	console.log(err)
	res.status(err.status || 500).json({
		error: 'Internal server error',
		message: err.message
	})
}

const notFound = (req, res, next) => {
	res.status(404).json({
		message: 'Route not found'
	})
}

export {catchErrors, mongooseErrors, developmentErrors, productionErrors, notFound}
