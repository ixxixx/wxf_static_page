<template>
  <div>
    <ul id="chatContainer">
      <li><a href="#">最新事件..........</a></li>
      <li>
        <a href="#">1</a>
      </li>
      <li>
        <a href="#">2</a>
      </li><li>
        <a href="#">2</a>
      </li><li>
        <a href="#">2</a>
      </li><li>
        <a href="#">2</a>
      </li><li>
        <a href="#">2</a>
      </li><li>
        <a href="#">2</a>
      </li><li>
        <a href="#">1</a>
      </li>
      <li>
        <a href="#">2</a>
      </li><li>
        <a href="#">2</a>
      </li><li>
        <a href="#">2</a>
      </li><li>
        <a href="#">2</a>
      </li><li>
        <a href="#">2</a>
      </li><li>
        <a href="#">2</a>
      </li><li>
        <a href="#">1</a>
      </li>
      <li>
        <a href="#">2</a>
      </li><li>
        <a href="#">2</a>
      </li><li>
        <a href="#">2</a>
      </li><li>
        <a href="#">2</a>
      </li><li>
        <a href="#">2</a>
      </li><li>
        <a href="#">2</a>
      </li>

    </ul>
  </div>
</template>
<script>
export default {
}
</script>
<style scoped lang="less">
#chatContainer {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  li {
    margin-left: 10/96rem;
    list-style: none;
    height: 15/96rem;
    &:nth-child(1) {
      font-size: 10/96rem;
      margin-top: 5/96rem;
      margin-bottom: 5/96rem;
    }
    a {
      color: #fff;
      text-decoration: none;
    }
  }
}
</style>
