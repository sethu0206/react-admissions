let promise=require('promise');
let exquery=function (sql,con)
{
 let n;
 return new promise((resolve,reject)=>{

 			con.getConnection(function(err,connection){
					if(err)
	           			  throw err;
                 			connection.query(sql, function(err,result){
                                 			if(err)
				   				reject(err);
                                  			else{
								resolve(result)
                console.log("query executed successfully");}
              });

					connection.release();
					if(err)
					   throw err;
                                  });

                           });


}
exports.exquery=exquery;
