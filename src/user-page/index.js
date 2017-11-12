import page from 'page'
import header from '../header'
import title from 'title'
import empty from 'empty-element'
import tem from './temple'
import utils from '../utils'
page('/:username',utils.loadAuth, header,loadUser, function (ctx,next) {

	var main = document.getElementById('main-container')
	title(`Ovents| ${ctx.params.username}`)
	empty(main).appendChild(tem(ctx.user))

})
page('/:username/:id',utils.loadAuth , header,loadUser, function (ctx,next) {

	var main = document.getElementById('main-container')
	title(`Ovents| ${ctx.params.username}`)
	empty(main).appendChild(tem(ctx.user))
    $(`#modal${ctx.params.id}`).openModal({
        complete: function() { page(`/${ctx.params.username}`);},
        opacity: .8,
        inDuration: 50, // Transition in duration
        outDuration: 700
    }
     
    );
})

async function loadUser (ctx, next){
    try{
    ctx.user = await  fetch(`/api/user/${ctx.params.username}`).then(res => res.json());
    next();
    }catch(err){
        console.log(err)
        
    }
    
}