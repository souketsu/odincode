function Book(title,info,author,pages,read) {
  if(!new.target) {
    throw Error("You must use the 'new' operator...");
  }
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, read: ${this.read}`;
  }
}

const wuwaizhuan = new Book('武林外传','武林外传info','作者1',100,true);
console.log(wuwaizhuan.info());

