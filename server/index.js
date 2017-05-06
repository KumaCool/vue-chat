let express = require('express'),
	app = express(),
	db = require('./db'),
	server = require('http').Server(app),
	io = require('socket.io')(server),
	crypto = require('crypto');

let variable = {
	online: 0 // 在线人数
}

server.listen(3000);

app.use(express.static('../dist'));
app.get('/', function (req, res) {
  res.send('Hello World')
})

io.on('connection', function (socket) {
	variable.online++;
	socket.on('disconnect', () => variable.online--);

	/**
	 * 接收用户动作接口
	 * @param  {String} obj.type 执行类型
	 * @param {Object} obj.data 具体数据
	 * @return {Function} msg = re_act_norm()
	 */
	socket.on('action', function (obj) {
		obj = JSON.parse(obj);
		let allData = obj.data,
			msg = re_act_norm(0);

		switch (obj.type) {
			case 'signUp':
				var userModel = db.get_model('user');
				allData.password = encrypt(allData.password);
				if (isNull(allData.user)) break;
				userModel.find({user: allData.user}).exec((err,query) => {
					if (!err && isNull(query)) {
						allData.token = encrypt(allData.user,1);
						userModel.create(allData);
						msg = re_act_norm(1, allData.token);
					} else msg = re_act_norm(0, err);
					socket.emit('reAct', msg);
				});
				break;
			case 'signIn':
				var userModel = db.get_model('user');
				allData.password = encrypt(allData.password);
				if (isNull(allData.user) || isNull(allData.password)) break;
				var tempToken = encrypt(allData.user,1);
				userModel.update(allData, {$set: {token: tempToken}}, function (err, response) {
					if (!err && response.n === 1) {
						msg = re_act_norm(1, tempToken);
					} else msg = re_act_norm(0, err);
					socket.emit('reAct', msg);
				});
				break;
		}
	});

	// 用户消息
	socket.on('message', function (r) {
		console.log(r);
	});
});

/**
 * 定义接口返回格式
 * @param  {Number} code 1:成功,0:失败
 * @param  {All} info 返回信息
 * @return {Object}
 */
function re_act_norm (code, info) {
	return {
		code: code,
		info: info
	}
}

/**
 * 判断是否为空
 * @param  {All}  val 被判断的对象
 * @return {Boolean}  如果为空返回true
 */
function isNull (val) {
	return (val === '' || val == null || val.length === 0) ? true : false;
}

/**
 * 加密
 * @param  {String} val 被加密参数
 * @param  {Number} token 不设置为MD5加密,设置1为sha1随机加密
 * @return {String}     返回加密后的值
 */
function encrypt (val, token) {
	let m;
	if (token === 1) {
		token = crypto.randomBytes(8).toString('hex');
		m = crypto.createHmac('sha1', token);
	}else m = crypto.createHash('md5');
	m.update(val);
	return m.digest('hex').split('').reverse().join('');
}

console.log('server staring');
