<template>
    <div>
        <h2>Chuck Norris fact...</h2>
         <img src="./chuck_norris.jpg" />
        <br>
        <h2>{{ fact }}</h2>
    </div>
    
   
</template>

<script>
export default {
    props: ['facts'],

    data: function(){
        return {
            fact: '',
        };
    },
    
    created:function(){
        this.fact = this.facts[Math.floor(Math.random() * this.facts.length)];
    }
}
</script>