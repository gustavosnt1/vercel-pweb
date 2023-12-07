import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Carro } from 'src/app/shared/model/carro';
import { CarroFirestoreService } from 'src/app/shared/services/carroFirestore.service';

@Component({
  selector: 'app-carro-listagem',
  templateUrl: './carro-listagem.component.html',
  styleUrls: ['./carro-listagem.component.css']
})
export class CarroListagemComponent {
  carros: Carro[] = [];
  carrosPesquisa: Array<Carro> = [];
  modeloPesquisado: string = '';
  carrosPesquisados: Carro[] = [];

  constructor(private carroFirestoreService: CarroFirestoreService, private roteador: Router){

  }

  ngOnInit(){
    this.carroFirestoreService.listar().subscribe(carrosRetornados => {
      this.carros = carrosRetornados;
    });

  }

  remover(carroARemover: string): void {
    this.carroFirestoreService.apagar(carroARemover).subscribe(carroRemovido => {
        console.log("Carro removido");
      const indexARemover = this.carros.findIndex( carro =>
        carro.id === carroARemover);

        if(indexARemover >= 0){
          this.carros.splice(indexARemover, 1);
        }
    });
  }

  // pesquisar(){
  //   this.carroService.pesquisarModelo(this.modeloPesquisado).subscribe(carros => {
  //       this.carrosPesquisados = carros;
  //     })
  // }

  editar(id: string) : void {
    this.roteador.navigate(['edicao-carro', id]);
  }
}
