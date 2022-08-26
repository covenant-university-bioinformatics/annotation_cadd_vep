#!/usr/bin/env bash 
##./vep -i variations.vcf --plugin CADD,/FULL_PATH_TO_CADD_FILE/whole_genome_SNVs.tsv.gz,/FULL_PATH_TO_CADD_FILE/InDels.tsv.gz

input=$1
outdir=$2

bindir="/bindir" ## mount voulume
dbdir="/db" ## mount voulume
 
${bindir}/vep -i ${input} -o ${outdir}/cadd_annoation.txt -offline \
--dir_cache  ${bindir}/cache --plugin CADD,${dbdir}/InDels.tsv.gz,${dbdir}/whole_genome_SNVs.tsv.gz \
--dir_plugin  ${bindir}/cache/Plugins --tab

if [ -f  ${outdir}/cadd_annoation.txt ]; then
    grep -v "^##" ${outdir}/cadd_annoation.txt > ${outdir}/results_annoation.txt;
    else 
    touch ${outdir}/results_annoation.txt
fi    
    




