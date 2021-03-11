let input = undefined

document.addEventListener("DOMContentLoaded", ()=>{
	input = new Vue({
		el: "#inBox",
		template: `	<div>
		<textarea id="input" class="form-control text-white bg-dark" v-model="message" placeholder="Input here..." rows="6"></textarea>
		</div>`,
		
		data() {
			return {
				message: ''
			}
		}
	})
})