module.exports = {	
	checkDomain : function(email) {

		var list = ['yahoo.co.nz',
					'yahoo.se',
					'yahoo.no',
					'yahoo.ru',
					'yahoo.nl',
					'yahoo.com.ar',
					'yahoo.com.au',
					'yahoo.at',
					'yahoo.be',
					'yahoo.com.br',
					'yahoo.de',
					'yahoo.com.cn',
					'yahoo.cn',
					'yahoo.com.co',
					'yahoo.cz',
					'yahoo.dk',
					'yahoo.fi',
					'yahoo.ie',
					'vp.pl',
					'gmail.com',
					'yahoo.com',
					'hotmail.com',
					'outlook.com',
					'kolumbus.com',
					'mail.com',
					'aol.com',
					'msn.com',
					'comcast.net',
					'hotmail.co.uk',
					'sbcglobal.net',
					'yahoo.fr',
					'yahoo.co.uk',
					'yahoo.co.in',
					'yahoo.ca',
					'rediffmail.com',
					'usa.com',
					'post.com',
					'kolumbus.fi',
					'iki.fi'
					];

		var domain = email.replace(/.*@/, "");
		if(list.indexOf(domain) === -1){
			return true;
		}else{
			return false;
		}
	}
}
