import { Component, inject } from '@angular/core';
import { itemsList } from '../model/model';
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
  private formB=inject(FormBuilder);



  cadastro:FormGroup = this.formB.group({
    id: [''],
    nome: ['', Validators.required],
    valor: ['', Validators.required],

    });

   public service = inject(GeralService)

  ngOnInit(): void {
   this.meusProdutos();



  }




  meusProdutos() {
    this.service.getListaProdutosApi()
      .subscribe({
        next: (resposta: itemsList[]) => {
          this.lista = resposta;
           console.log(this.lista)
        }
      })
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

















}

