const fs = require('fs');
const pdf=require('html-pdf');
const {PDFDocument} = require('pdf-lib');

module.exports={
    name:"merge",

    actions:{

        async convert(){
            var html= fs.readFileSync('./public/card2.html','utf-8');
        
        let options={
            format:'Letter'
        }
        
        pdf.create(html,options).toFile('./public/new2.pdf', (err,res)=>{
            if(err) return console.log(err);
            console.log(res);
        })
        
        },
        
        async merge(){
            const cover= await PDFDocument.load(fs.readFileSync('./public/new1.pdf'));
            const content= await PDFDocument.load(fs.readFileSync('./public/new2.pdf'));
        
            const doc = await PDFDocument.create();
        
            const contentPages1=await doc.copyPages(cover,cover.getPageIndices());
            for(const page of contentPages1){
                doc.addPage(page);
            }
        
            const contentPages2=await doc.copyPages(content,content.getPageIndices());
            for(const page of contentPages2){
                doc.addPage(page);
            }
        
            fs.writeFileSync('./public/test.pdf',await doc.save());
        }
    },

};