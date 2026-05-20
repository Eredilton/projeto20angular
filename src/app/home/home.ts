import { Component, inject } from '@angular/core';
import { dadosList, itemsList, listaCompleta } from '../model/model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GeralService } from '../service/geral-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [
    ReactiveFormsModule,CommonModule
  ],
  standalone:true,
  templateUrl: './home.html',
  styleUrl: './home.css',

})

export class Home {

  lista!:itemsList[];
  listaDeDados!:dadosList[];
  dadosCompletos!:listaCompleta[];
  cadastro!:FormGroup;
  private formB=inject(FormBuilder);





   public service = inject(GeralService)

  ngOnInit(): void {

   this.meusProdutos();
   this.cadastrar();
   this.minhaListaDados();
   this.ListaDados();

  }

cadastrar(){

 this.cadastro = this.formB.group({
    id: [''],
    nome: ['', Validators.required,null],
    valor: ['', Validators.required,null],

    });

}


  meusProdutos() {
    this.service.getListaProdutosApi().subscribe(
      (resposta: itemsList[]) =>
        {this.lista = resposta; console.log(this.lista)})
  }



  cadastrarProduto() {
    this.service.postProdutos(this.cadastro.value)
      .subscribe((res: itemsList) => { this.lista });
    location.reload()
  };




  deletar(id: any): void {
    this.service.deleteProdutos(id).subscribe(() => {
        this.lista = this.lista.filter(p => p.id !== id);
      })

  };




minhaListaDados() {

    this.service.getDados()
      .subscribe((resposta: any[]) => {
          this.listaDeDados = resposta;
           console.log(this.listaDeDados)

      })
  }


ListaDados() {

    this.service.listaGet()
      .subscribe((resposta: any[]) => {
          this.dadosCompletos = resposta;
           console.log(this.dadosCompletos)

      })
  }










}

