/**
 * Murlidhar Varma
 * DNA class contains the gene of each bot
 * gene is an array of forces that need to applied to bot to move in a direction
 */
class dna{

    // If a gene (array of forces that applies on bot to move) is passed then use that gene in DNA
    // else generate a random sequence of gene
    constructor(lifespan, gene){
        this.lifespan = lifespan;

        // if gene is passed, use that gene to create dna
        if(gene != null){
            this.gene = gene;
        }
        // else generate a random gene sequence
        else{
            this.gene = [];
            for (let i=0; i < lifespan; i++) {
                this.gene.push(p5.Vector.random2D());
            }
        }

    }

    // Cross the gene between 2 DNA and create a new DNA
    // This is used for reproduction of child bot by crossing genes from parents
    cross(spouse){
        // let midpoint = floor(this.gene.length / 2);
        let newGene = [];

        //every alternate gene is picked from either of the parents.
        for(let i=0 ; i<this.gene.length; i++){
            if(i % 2 ==0){
                newGene.push(this.gene[i]);
            }else{
                newGene.push(spouse.gene[i])
            }
        }
        
        //return new crossed dna
        return new dna(this.lifespan, newGene);
    }
}