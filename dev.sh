#!/usr/bin/env bash

# 配置

# 端口号
port=1234
# 输出路径
outDir="./dist/"

parcel ./index.html -p ${port} --out-dir ${outDir}